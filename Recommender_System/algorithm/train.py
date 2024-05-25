from typing import List, Tuple, Callable, Dict
import tensorflow as tf
from Recommender_System.algorithm.common import log, topk
from Recommender_System.utility.evaluation import TopkData
from Recommender_System.utility.decorator import logger


def prepare_ds(train_data: List[Tuple[int, int, int]], test_data: List[Tuple[int, int, int]],
               batch: int) -> Tuple[tf.data.Dataset, tf.data.Dataset]:
    def xy(data):
        user_ids = tf.constant([d[0] for d in data], dtype=tf.int32)
        item_ids = tf.constant([d[1] for d in data], dtype=tf.int32)
        labels = tf.constant([d[2] for d in data], dtype=tf.keras.backend.floatx())
        return {'user_id': user_ids, 'item_id': item_ids}, labels

    train_ds = tf.data.Dataset.from_tensor_slices(xy(train_data)).shuffle(len(train_data)).batch(batch)
    test_ds = tf.data.Dataset.from_tensor_slices(xy(test_data)).batch(batch)

    return train_ds, test_ds


def _evaluate(model, dataset, loss_object, mean_metric=tf.keras.metrics.Mean(), auc_metric=tf.keras.metrics.AUC(),
              precision_metric=tf.keras.metrics.Precision(), recall_metric=tf.keras.metrics.Recall()):
    for metric in [mean_metric, auc_metric, precision_metric, recall_metric]:
        tf.py_function(metric.reset_states, [], [])

    @tf.function
    def evaluate_batch(ui, label):
        score = tf.squeeze(model(ui))
        loss = loss_object(label, score) + sum(model.losses)
        return score, loss

    for ui, label in dataset:
        score, loss = evaluate_batch(ui, label)

        mean_metric.update_state(loss)
        auc_metric.update_state(label, score)
        precision_metric.update_state(label, score)
        recall_metric.update_state(label, score)

    return mean_metric.result(), auc_metric.result(), precision_metric.result(), recall_metric.result()


def _train_graph(model, train_ds, test_ds, topk_data, optimizer, loss_object, epochs):
    score_fn = get_score_fn(model)

    @tf.function
    def train_batch(ui, label):
        with tf.GradientTape() as tape:
            score = tf.squeeze(model(ui, training=True))
            loss = loss_object(label, score) + sum(model.losses)
        gradients = tape.gradient(loss, model.trainable_variables)
        optimizer.apply_gradients(zip(gradients, model.trainable_variables))

    for epoch in range(epochs):
        for ui, label in train_ds:
            train_batch(ui, label)

        train_loss, train_auc, train_precision, train_recall = _evaluate(model, train_ds, loss_object)
        test_loss, test_auc, test_precision, test_recall = _evaluate(model, test_ds, loss_object)

        log(epoch, train_loss, train_auc, train_precision, train_recall, test_loss, test_auc, test_precision, test_recall)
        topk(topk_data, score_fn)


def _train_eager(model, train_ds, test_ds, topk_data, optimizer, loss_object, epochs):
    model.compile(optimizer=optimizer, loss=loss_object, metrics=['AUC', 'Precision', 'Recall'], run_eagerly=True)
    model.fit(train_ds, epochs=epochs, verbose=0, validation_data=test_ds,
              callbacks=[RsCallback(topk_data, get_score_fn(model))])


class RsCallback(tf.keras.callbacks.Callback):
    def __init__(self, topk_data: TopkData, score_fn: Callable[[Dict[str, List[int]]], List[float]]):
        super(RsCallback, self).__init__()
        self.topk_data = topk_data
        self.score_fn = score_fn

    def on_epoch_end(self, epoch, logs=None):
        list_params = [logs[key] for key in list(logs.keys())]

        # Log to terminal
        log(epoch, *list_params)

        # Appending to file
        try:
            with open("./logs.txt", 'a') as file1:
                file1.write("Epoch {0}, ".format(epoch) + "Loss: {0}, AUC: {1}, PRECISION: {2}, RECALL: {3}, VAL_LOSS: {4}, VAL_AUC: {5}, VAL_PRECISION: {6}, VAL_RECALL: {7} \n".format(
                    *list_params
                ))
        except Exception as ex:
            print(ex)
        
        # Top k
        topk(self.topk_data, self.score_fn)


@logger('[TRAIN] Start training: ', ('epochs', 'batch', 'execution'))
def train(model: tf.keras.Model, train_data: List[Tuple[int, int, int]], test_data: List[Tuple[int, int, int]],
          topk_data: TopkData, optimizer=None, loss_object=None, epochs=100, batch=512, execution='eager') -> None:
    """
    General training process.

    :param model: Model
    :param train_data: Training set
    :param test_data: test set
    :param topk_data: Used for topk evaluation data
    :param optimizer: Optimizer, default is Adam
    :param loss_object: Loss function, default is BinaryCrossentropy
    :param epochs: Number of iterations
    :param batch: batch quantity
    :param execution: Execution mode, either eager or graph. In eager mode, use model.fit; in graph mode, use tf.function and GradientTape
    """
    if optimizer is None:
        optimizer = tf.keras.optimizers.Adam()
    if loss_object is None:
        loss_object = tf.keras.losses.BinaryCrossentropy()

    train_ds, test_ds = prepare_ds(train_data, test_data, batch)
    train_fn = _train_eager if execution == 'eager' else _train_graph
    train_fn(model, train_ds, test_ds, topk_data, optimizer, loss_object, epochs)


@logger('[TEST] Start testing: ', ('batch',))
def test(model: tf.keras.Model, train_data: List[Tuple[int, int, int]], test_data: List[Tuple[int, int, int]],
         topk_data: TopkData, loss_object=None, batch=512) -> None:
    """
    Common testing process.

    :param model: Model
    :param train_data: Training set
    :param test_data: test set
    :param topk_data: Used for topk evaluation data
    :param loss_object: Loss function, default is BinaryCrossentropy
    :param batch: batch quantity
    """
    if loss_object is None:
        loss_object = tf.keras.losses.BinaryCrossentropy()

    train_ds, test_ds = prepare_ds(train_data, test_data, batch)
    train_loss, train_auc, train_precision, train_recall = _evaluate(model, train_ds, loss_object)
    test_loss, test_auc, test_precision, test_recall = _evaluate(model, test_ds, loss_object)
    log(-1, train_loss, train_auc, train_precision, train_recall, test_loss, test_auc, test_precision, test_recall)
    topk(topk_data, get_score_fn(model))


def get_score_fn(model):
    @tf.function(experimental_relax_shapes=True)
    def _fast_model(ui):
        return tf.squeeze(model(ui))

    def score_fn(ui):
        ui = {k: tf.constant(v, dtype=tf.int32) for k, v in ui.items()}
        return _fast_model(ui).numpy()

    return score_fn
