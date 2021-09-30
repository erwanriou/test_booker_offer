const Validator = require("validator")
const isEmpty = require("./isEmpty")

module.exports = validateOfferInput = data => {
  let errors = {}

  data.product_name = !isEmpty(data.product_name) ? data.product_name : ""
  data.discount_value = !isEmpty(data.discount_value) ? data.discount_value : ""

  if (!Validator.isLength(data.product_name, { min: 2, max: 30 })) {
    errors.product_name = "Product name must be between 2 and 30 characters"
  }
  if (Validator.isEmpty(data.product_name)) {
    errors.product_name = "Product name field is required"
  }
  if (Validator.isEmpty(data.discount_value)) {
    errors.discount_value = "Discount value field is required"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
