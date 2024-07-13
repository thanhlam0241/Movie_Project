import { Client } from "@elastic/elasticsearch";
import "dotenv/config";

const client = new Client({
  node: "https://b8c627a13dc544c98527e95162345c1f.us-central1.gcp.cloud.es.io:443",
  auth: {
    apiKey: "SHJnQW5KQUJNVkVnUWRjTlhuMlQ6YkwwQjRBM3NTcHFzSG56LWVUY1REZw==",
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
