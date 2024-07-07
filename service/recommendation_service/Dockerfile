FROM continuumio/miniconda3

WORKDIR /app/ripplenet

# Override default shell and use bash
# SHELL ["/bin/bash", "--login", "-c"]

# Create the environment:
COPY environment.yml .
RUN conda env create -f environment.yml

# Make RUN commands use the new environment:

RUN echo "conda activate myenv" >> ~/.bashrc
SHELL ["/bin/bash", "--login", "-c"]

# Make RUN commands use the new environment:
# SHELL ["conda", "run", "-n", "myenv", "/bin/bash", "-c"]

COPY . .
# RUN conda install -r requirements.txt

# The code to run when container is started:
COPY entrypoint.sh ./
RUN chmod +x entrypoint.sh
RUN ls -la
ENTRYPOINT ["./entrypoint.sh"]