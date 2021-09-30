const express = require("express")
const db = require("mongoose")

// DATABASE AND LIBRARIES
const Import = require("@erwanriou/test_booker_common")
const isAuthenticated = Import("middlewares", "isAuthenticated")
const Offer = Import("models", "Offer", "offer")

// EVENTS
const { NatsWrapper } = require("../../../../services/natsWrapper")
const { OfferCreatedPub } = require("../../../../events/publishers/offerCreatedPub")

// IMPORT VALIDATION
const isEmpty = require("../../../../validation/isEmpty")
const validateOfferInput = require("../../../../validation/offer")
const { DatabaseConnectionError, BadRequestError } = Import("factory", "errors")

const router = express.Router()

// @route  POST api/offer/admin/offer/create
// @desc   Create a new offer as authenticated user
// @access Private
router.post("/", isAuthenticated, async (req, res) => {
  // VALIDATION
  const { errors, isValid } = validateOfferInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  // DEFINE VARIABLES
  const { product_name, discount_value } = req.body

  // DEFINE FIELDS
  const offerFields = {
    product_name,
    discount_value,
    date: Date.now()
  }

  // HANDLE MONGODB TRANSACTIONS
  const SESSION = await db.startSession()
  try {
    // CREATE PROFILE
    await SESSION.startTransaction()
    const offer = await new Offer(offerFields).save()
    await new OfferCreatedPub(NatsWrapper.client()).publish(offer)
    await SESSION.commitTransaction()

    // RETURN AND FINALIZE ENDPOINT
    res.status(201).json(offer)
  } catch (e) {
    // CATCH ANY ERROR DUE TO TRANSACTION
    await SESSION.abortTransaction()
    console.error(e)
    throw new DatabaseConnectionError()
  } finally {
    // FINALIZE SESSION
    SESSION.endSession()
  }
})
module.exports = router
