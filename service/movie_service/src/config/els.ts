import { Client } from "@elastic/elasticsearch";
import "dotenv/config";

const client = new Client({
  node: "https://6de7d4e1371f44158842a6d6e7d538d0.asia-southeast1.gcp.elastic-cloud.com:443",
  auth: {
    apiKey: "Q09Md1U1QUJSQzA2V1UyX0dhbUQ6VnJockdfd3hRckdxcVdmcnVMUmU2QQ==",
  },
});

// API Key should have cluster monitor rights.
client
  .info()
  .then((res) => {
    console.log("Sucessful connect to elasticsearch");
  })
  .catch((e) => console.log(e));

export default client;
