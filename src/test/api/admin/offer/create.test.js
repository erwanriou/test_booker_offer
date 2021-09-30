const request = require("supertest")
const app = require("../../../../app")

it("returns a 401 if not signed in", async () => {
  await request(app).post("/api/offer/admin/offer/create").send({}).expect(401)
})

it("returns a 201 when create a new offer as admin with correct input", async () => {
  // GENERATE ADMIN
  const userBuilder = global.userGenerator()
  const adminCookie = await global.register(userBuilder)

  // GENERATE ARTICLE
  const offer = global.offerGenerator()

  // TEST ENDPOINT
  const { body } = await request(app).post("/api/offer/admin/offer/create").set("Cookie", adminCookie).send(offer).expect(201)

  // CHECK DATA
  expect(offer.product_name).toEqual(body.product_name)
  expect(offer.discount_value).toEqual(body.discount_value)
})

it("returns a 400 when create a new offer as admin and missing required fields", async () => {
  // GENERATE ADMIN
  const userBuilder = global.userGenerator()
  const adminCookie = await global.register(userBuilder)

  // GENERATE ARTICLE
  const offer = { ...global.offerGenerator(), discount_value: "" }

  // TEST ENDPOINT
  const { body } = await request(app).post("/api/offer/admin/offer/create").set("Cookie", adminCookie).send(offer).expect(400)

  // CHECK DATA
  // CHECK DATA
  expect(body.discount_value).toEqual("Discount value field is required")
})
