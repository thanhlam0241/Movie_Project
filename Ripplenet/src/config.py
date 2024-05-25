class Para:
    def __init__(self):
        self.dim = 16
        self.dataset = 'movie'
        self.n_hop = 2
        self.kge_weight = 0.01
        self.l2_weight = 1e-7
        self.lr = 0.02
        self.batch_size = 1024 
        self.n_epoch = 10
        self.n_memory = 32
        self.item_update_mode = 'plus_transform'
        self.using_all_hops = True
        self.model_dir = '../model'
        self.use_cuda = False
        self.k = 10


def get_param():
    return Para()
