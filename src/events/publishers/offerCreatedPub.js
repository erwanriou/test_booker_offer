const Import = require("@erwanriou/test_booker_common")
const { Publisher } = Import("factory", "publisher")
const { Subject } = Import("factory", "types")

// CHILDREN CLASS
class OfferCreatedPub extends Publisher {
  subject = Subject.OFFER_CREATED
}

exports.OfferCreatedPub = OfferCreatedPub
