import argparse
import numpy as np
from data_loader import load_data
from train import train
from preprocess import preprocess

def buildModel():
    # Preprocess model
    preprocess()

    np.random.seed(555)  # seed data

    parser = argparse.ArgumentParser()
    parser.add_argument('--dataset', type=str, default='movie', help='which dataset to use')
    parser.add_argument('--dim', type=int, default=16, help='dimension of entity and relation embeddings')
    parser.add_argument('--n_hop', type=int, default=2, help='maximum hops')
    parser.add_argument('--kge_weight', type=float, default=1, help='weight of the KGE term')
    parser.add_argument('--l2_weight', type=float, default=1e-7, help='weight of the l2 regularization term')
    parser.add_argument('--lr', type=float, default=0.02, help='learning rate')
    parser.add_argument('--batch_size', type=int, default=1024, help='batch size')
    parser.add_argument('--n_epoch', type=int, default=10, help='the number of epochs')
    parser.add_argument('--n_memory', type=int, default=32, help='size of ripple set for each hop')
    parser.add_argument('--item_update_mode', type=str, default='plus_transform',
                        help='how to update item at the end of each hop')
    parser.add_argument('--using_all_hops', type=bool, default=True,
                        help='whether using outputs of all hops or just the last hop when making prediction')
    parser.add_argument('--model_dir', type=str, default='../model', help='directory to save model')
    parser.add_argument('--use_cuda', type=bool, default=False, help='whether to use gpu')
    parser.add_argument('--k', type=int, default=10, help='number of top_k')

    args = parser.parse_args()
    show_loss = False  # Does show loss
    data_info = load_data(args) 
    
    # Train
    train(args, data_info, show_loss)
