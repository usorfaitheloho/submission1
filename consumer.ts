const Kafka = require("node-rdkafka");

const TOPIC_NAME = "testing";

const stream = new Kafka.createReadStream(
  {
    "metadata.broker.list": "practise1-project-kafka-dev-usorfaitheloho-2f87.j.aivencloud.com:18136",
    "group.id": "GROUP_ID",
    "security.protocol": "ssl",
    "ssl.key.location": "./certificates/service.key",
    "ssl.certificate.location": "./certificates/service.cert",
    "ssl.ca.location": "./certificates/ca.pem",
  },
  { "auto.offset.reset": "beginning" },
  { topics: [TOPIC_NAME] }
);

stream.on("data", (message) => {
  console.log("Got message using SSL:", message.value.toString());
});