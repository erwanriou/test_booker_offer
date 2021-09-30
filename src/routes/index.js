// REQUIRES FONCTION
const requires = (path, array) =>
  array.map(item => ({
    path: require(`../routes/api/${item}`),
    url: `/api/${path}/${item}`
  }))

// API ROUTES
let offer = []
let ad = []

// APPLY REQUIRES
offer = requires("offer", offer)
ad = requires("ad", ad)

module.exports = routes = [...offer, ...ad]
