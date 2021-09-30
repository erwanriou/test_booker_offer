const mongoose = require("mongoose")
const faker = require("faker")
const request = require("supertest")
const jwt = require("jsonwebtoken")

// IMPORT HELPERS
const dbhandler = require("./dbhandler")
const app = require("../app")

// CREATE TEST DATABASE
beforeAll(async () => {
  process.env.JWT_TOKEN = faker.random.uuid()
  await dbhandler.connect()
})

// MOCKED FILES
jest.mock("../services/natsWrapper", () => require("./mocks/natsWrapper"))

// DROP TEST DABASE
beforeEach(async () => await dbhandler.clearDatabase())

// CLOSE TEST DATABSE
afterAll(async () => await dbhandler.closeDatabase())

// GLOBAL SCOPE
global.userGenerator = () => {
  return {
    _id: new mongoose.Types.ObjectId().toHexString(),
    email: faker.internet.email().toLowerCase(),
    name: faker.name.findName(),
    authorities: ["ROLE_USER"]
  }
}

global.offerGenerator = () => {
  return {
    product_name: faker.name.findName(),
    discount_value: faker.name.findName()
  }
}

global.register = async user => {
  // BUILD A PAYLOAD
  const payload = { ...user }
  // GENERATE TOKEN
  const session = JSON.stringify({
    jwt: jwt.sign(payload, process.env.JWT_TOKEN)
  })
  // BUILD OBJECT AND BASE 6$ ENCRYPT
  return [`express:sess=${Buffer.from(session).toString("base64")}`]
}
