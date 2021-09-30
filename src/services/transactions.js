const mongoDbConnect = require("./mongoDb")
const natsStreaming = require("./natsStreaming")

module.exports = async client => {
  try {
    await natsStreaming()
    await mongoDbConnect(client)
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
}
