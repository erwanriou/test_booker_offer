const { NatsWrapper } = require("./natsWrapper")

// IMPORT USER LISTENERS
module.exports = async natsStreaming => {
  // CONNECT NATS
  await NatsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
  // GRACEFULLY CLOSE
  NatsWrapper.client().on("close", () => {
    console.log("NATS connection closed")
    process.exit(0)
  })
  process.on("SIGINT", () => NatsWrapper.client().close())
  process.on("SIGTERM", () => NatsWrapper.client().close())

  // LISTENNING TRAFFIC
}
