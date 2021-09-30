// REQUIRES FONCTION
const requires = (path, array) =>
  array.map(item => ({
    path: require(`../routes/${path}/${item}`),
    url: `/${path}/offer/${item}`
  }))

// API ROUTES
let admin = [
  "admin/offer/create"
  // "admin/offer/filters", "admin/offer/list", "admin/offer/edit", "admin/offer/offer"
]
let publics = [
  // "public/offer/list", "public/offer/filters", "public/offer/offer"
]
// APPLY REQUIRES
admin = requires("api", admin)
publics = requires("api", publics)

module.exports = routes = [...admin, ...publics]
