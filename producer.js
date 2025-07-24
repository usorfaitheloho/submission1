const Kafka = require("node-rdkafka");

const TOPIC_NAME = "testing.public.test_table";

const producer = new Kafka.Producer({
  "metadata.broker.list":
    "practise1-project-kafka-dev-usorfaitheloho-2f87.j.aivencloud.com:18136",
  "security.protocol": "ssl",
  "ssl.key.location": "./certificates/service.key",
  "ssl.certificate.location": "./certificates/service.cert",
  "ssl.ca.location": "./certificates/ca.pem",
  dr_cb: true,
});

producer.connect();

const sleep = async (timeInMs) =>
  await new Promise((resolve) => setTimeout(resolve, timeInMs));

const produceMessagesOnSecondIntervals = async () => {
  // produce 100 messages on 1 second intervals
  let i = 0;
  while (i < 100) {
    try {
      if (!producer.isConnected()) {
        await sleep(1000);
        continue;
      }

      const message = `Hello from Node using SSL ${++i}!`;
      producer.produce(
        // Topic to send the message to
        TOPIC_NAME,
        // optionally we can manually specify a partition for the message
        // this defaults to -1 - which will use librdkafka's default partitioner (consistent random for keyed messages, random for unkeyed messages)
        null,
        // Message to send. Must be a buffer
        Buffer.from(message),
        // for keyed messages, we also specify the key - note that this field is optional
        null,
        // you can send a timestamp here. If your broker version supports it,
        // it will get added. Otherwise, we default to 0
        Date.now()
      );
      console.log(`Message sent: ${message}`);
    } catch (err) {
      console.error("A problem occurred when sending our message");
      console.error(err);
    }

    await sleep(1000);
  }

  producer.disconnect();
};

produceMessagesOnSecondIntervals();
