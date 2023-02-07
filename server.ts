import next from "next";
const routes = require("./routes");

const app = next({
    dev: process.env.NODE_ENV !== "production"
});

const handler = routes.getRequestHandler(app)

const { createServer } = require("http")
app.prepare().then(() => {
    createServer(handler).listen( process.env.PORT || 3000, (error: any) => {
        if (error) throw error;

        console.log("Server is up and running on localhost:3000")
    })
});