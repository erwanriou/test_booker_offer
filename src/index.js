const app = require("./app")
const transaction = require("./services/transactions")

// CONNECT DATABASE
transaction("Booker Offer")

// LISTEN APP
app.listen(3000, () => {
  console.log("Booker Offer listening on port 3000!")
})
