# Before begin:
```
gcloud projects create PROJECT_ID
```
<!-- Replace PROJECT_ID with a name for the Google Cloud project you are creating. -->

## Select the Google Cloud project that you created:
```
gcloud config set project PROJECT_ID
gcloud config set project principal-arena-410906
```
## Enable the GKE, Backup for GKE, Compute Engine, Identity and Access Management, and Resource Manager APIs:
```
gcloud services enable compute.googleapis.com iam.googleapis.com container.googleapis.com gkebackup.googleapis.com cloudresourcemanager.googleapis.com
```
## Grant roles to your Google Account. Run the following command once for each of the following IAM roles: 

 <!-- role/storage.objectViewer, role/logging.logWriter, roles/container.clusterAdmin, role/container.serviceAgent, roles/iam.serviceAccountAdmin, roles/serviceusage.serviceUsageAdmin, roles/iam.serviceAccountAdmin -->
```
gcloud projects add-iam-policy-binding PROJECT_ID --member="user:EMAIL_ADDRESS" --role=ROLE
```
# Prepare the environment:

## Launch a Cloud Shell session from the Google Cloud console, by clicking Cloud Shell activation icon Activate Cloud Shell in the Google Cloud console. This launches a session in the bottom pane of the Google Cloud console.

## Set environment variables:
```
export PROJECT_ID=PROJECT_ID
export KUBERNETES_CLUSTER_PREFIX=kafka
export REGION=us-central1
```
Example: export PROJECT_ID=principal-arena-410906
## Clone the GitHub repository:
```
git clone https://github.com/GoogleCloudPlatform/kubernetes-engine-samples
```
## Change to the working directory:

```
cd kubernetes-engine-samples/streaming
``` 

# Create cluster infrastructure: 
```
export GOOGLE_OAUTH_ACCESS_TOKEN=$(gcloud auth print-access-token)
terraform -chdir=kafka/terraform/gke-autopilot init
terraform -chdir=kafka/terraform/gke-autopilot apply -var project_id=${PROJECT_ID} \
  -var region=${REGION} \
  -var cluster_prefix=${KUBERNETES_CLUSTER_PREFIX}
```

Output should be there:
```
Apply complete! Resources: 12 added, 0 changed, 0 destroyed.

Outputs:

kubectl_connection_command = "gcloud container clusters get-credentials kafka-cluster --region us-central1"
```

## Connect to the cluster:
```
gcloud container clusters get-credentials ${KUBERNETES_CLUSTER_PREFIX}-cluster --region ${REGION}
```

# Deploy the CFK operator to your cluster:

## Add the Confluent Helm Chart repository:

```
helm repo add confluentinc https://packages.confluent.io/helm
```

## Add a namespace for the CFK operator and the Kafka cluster:

```
kubectl create ns kafka
```

## Deploy the CFK cluster operator using Helm:

```
helm install confluent-operator confluentinc/confluent-for-kubernetes -n kafka
```

To enable CFK to manage resources across all namespaces, add the parameter --set-namespaced=false to the Helm command.

## Verify that the Confluent operator has been deployed successfully using Helm:

```
helm ls -n kafka
```

The output is similar to the following:

```
NAME                  NAMESPACE  REVISION UPDATED                                  STATUS      CHART                                APP VERSION
confluent-operator    kafka      1        2023-07-07 10:57:45.409158 +0200 CEST    deployed    confluent-for-kubernetes-0.771.13    2.6.0
```

# Deploy Kafka:
## Create a basic Kafka cluster:

1. Generate a CA pair:
```
openssl genrsa -out ca-key.pem 2048
openssl req -new -key ca-key.pem -x509 \
  -days 1000 \
  -out ca.pem \
  -subj "/C=US/ST=CA/L=Confluent/O=Confluent/OU=Operator/CN=MyCA"
```
2. Create a Kubernetes Secret for the certificate authority
```
kubectl create secret tls ca-pair-sslcerts --cert=ca.pem --key=ca-key.pem -n kafka
```
3. Create a new Kafka cluster using the basic configuration:
```
kubectl apply -n kafka -f kafka-confluent/manifests/01-basic-cluster/my-cluster.yaml
```
4. Wait a few minutes while Kubernetes starts the required workloads:
```
kubectl wait pods -l app=my-cluster --for condition=Ready --timeout=300s -n kafka
```
5. Verify that the Kafka workloads were created:
```
kubectl get pod,svc,statefulset,deploy,pdb -n kafka
```

# Authentication and user management:
Confluent for Kubernetes supports various authentication methods for Kafka, such as:
- SASL/PLAIN authentication: Clients use a username and password for authentication. The username and password are stored server-side in a Kubernetes secret.
- SASL/PLAIN with LDAP authentication: Clients use a username and password for authentication. The credentials are stored in an LDAP server.
- mTLS authentication: Clients use TLS certificates for authentication.