const routes = require('next-routes')();


routes.add("/campaigns/:address", "/campaigns/show");
routes.add("/campaigns/new", "/campaigns.new");

module.exports = routes;

export default routes;