from typing import List
import tensorflow as tf
from Recommender_System.utility.decorator import logger


class SLIM(tf.keras.Model):
    @logger('[INIT] Initialize the SLIM model: ', ('n_user', 'n_item'))
    def __init__(self, n_user: int, n_item: int, A: List[List[float]], **kwargs):
        super(SLIM, self).__init__(**kwargs)
        assert len(A) == n_user and len(A[0]) == n_item
        self.n_user, self.n_item = n_user, n_item
        self.A = tf.constant(A, dtype=tf.keras.backend.floatx())
        self.W = self.add_weight(name='W', shape=(n_item, n_item), dtype=tf.keras.backend.floatx(),
                                 initializer=tf.keras.initializers.Zeros(),
                                 constraint=SLIMwConstraint(n_item))
        self._AW = None
        self._AW_updated = False

    def loss(self, training=False):
        loss = tf.reduce_sum(tf.square(self.A - tf.matmul(self.A, self.W)))
        if training:
            tf.py_function(self._notify_AW_change, [], [])
        return loss

    def call(self, ui):  
        # Currently, the call method relies on the operation of numpy two-dimensional array. 
        # It must not be compiled into a graph, that is, do not put it in@tf.function方法内
        return self.AW[ui['user_id'], ui['item_id']]
        # The following implementation has serious unknown performance issues
        #user_id, item_id = ui['user_id'], ui['item_id']  # batch
        #indices = tf.concat([user_id[..., tf.newaxis], item_id[..., tf.newaxis]], axis=1)  # batch, 2
        #return tf.map_fn(lambda ui: self.AW[ui[0], ui[1]], indices, dtype=tf.keras.backend.floatx())  # batch

    @property
    def AW(self):
        if not self._AW_updated:
            self._AW = tf.matmul(self.A, self.W).numpy()
            self._AW_updated = True
        return self._AW

    def _notify_AW_change(self):
        self._AW_updated = False


class SLIMwConstraint(tf.keras.constraints.Constraint):
    def __init__(self, n_item: int):
        self.k = tf.cast(tf.ones((n_item, n_item)) - tf.eye(n_item), dtype=tf.keras.backend.floatx())

    def __call__(self, w):
        w = self.k * w  # Limit the values on the diagonal to 0
        w = w * tf.cast(tf.greater_equal(w, 0.), dtype=tf.keras.backend.floatx())  # The limit value is greater than or equal to 0
        return w


if __name__ == '__main__':
    model = SLIM(2, 3, [[0, 1, 1], [1, 0, 1]])
    print(model({'user_id': [0, 1, 0], 'item_id': [0, 2, 1]}))
    print(model({'user_id': [1, 0], 'item_id': [1, 2]}))
