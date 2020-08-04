"use strict";

const dotenv = require("dotenv");
const Hapi = require("@hapi/hapi");

const plugins = require("./src/plugins")
const routes = require("./src/routes");


// console.log("process.env.HOST =>", process.env.HOST)
// console.log("process.env.DATABASE_URL =>", process.env.DATABASE_URL)


const createServer = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    // host: process.env.HOST || "localhost"
  });

  await plugins.register(server);
  server.route(routes);

  return server;
};

const init = async () => {
  dotenv.config();
  const server = await createServer();
  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();