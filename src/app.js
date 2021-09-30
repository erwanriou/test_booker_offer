require("express-async-errors")
const express = require("express")
const helmet = require("helmet")
const compression = require("compression")
const bodyParser = require("body-parser")
const cookieSession = require("cookie-session")
const cookieParser = require("cookie-parser")

// IMPORT ROUTES
const routes = require("./routes")

// IMPORT MIDDLWARES
const Import = require("@erwanriou/test_booker_common")
const isError = Import("middlewares", "isError")
const isCurrentUser = Import("middlewares", "isCurrentUser")
const { NotFoundError } = Import("factory", "errors")

// LAUNCH EXPRESS
const app = express()
const secure = process.env.NODE_ENV !== "test"

// USE MAIN MIDDLWWARE
app.set("trust proxy", true)
app.use(helmet())
app.disable("x-powered-by")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieSession({ signed: false, secure }))
app.use(isCurrentUser)
app.use(cookieParser())
app.use(compression())

// USE ROUTES
app.get("/", (req, res) => res.status(200).send("User"))
routes.map(route => app.use(route.url, route.path))
app.all("*", async (req, res) => {
  throw new NotFoundError()
})

// USE CUSTOM MIDDLWWARE
app.use(isError)

module.exports = app
