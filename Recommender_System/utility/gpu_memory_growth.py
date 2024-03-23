"""
After importing this file, set the gpu to memory incremental mode
"""

from tensorflow import config

gpus = physical_devices = config.list_physical_devices('GPU')
if len(gpus) == 0:
    print('The GPU is currently not detected, and setting the memory incremental mode is invalid.')
for gpu in gpus:
    try:
        config.experimental.set_memory_growth(gpu, True)
    except RuntimeError as e:
        print(e)
