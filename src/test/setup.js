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
