const routes = require('next-routes')();
export {}

routes
    .add("/campaigns/new")
    .add("/campaigns/:address", "/campaigns/show")

module.exports = routes;