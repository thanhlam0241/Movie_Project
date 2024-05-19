#!/bin/bash --login
# The --login ensures the bash configuration is loaded,
# enabling Conda.

# Enable strict mode.
set -euo pipefail
# ... Run whatever commands ...

# Temporarily disable strict mode and activate conda:
set +euo pipefail
conda activate myenv

conda install --yes --file requirements.txt 

# Re-enable strict mode:
set -euo pipefail

cd src

# exec the final command:
# python preprocess.py

exec uvicorn main:app --host 0.0.0.0 --port 8087
# exec uvicorn main:app --host 0.0.0.0 --port 8086 --reload