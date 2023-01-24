const routes = require('next-routes')();


routes.add("/campaigns/:address", "/campaigns/show");
routes.add("/campaigns/:address/requests", "/campaigns/requests/index");
routes.add("/campaigns/:address/requests/new", "/campaigns/requests/new");
routes.add("/campaigns/new", "/campaigns.new");

module.exports = routes;

export default routes;