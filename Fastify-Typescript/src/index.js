const fastify = require("fastify")();
const prisma = require("../src/connection");

const fastifyCors = require('@fastify/cors');
fastify.register(fastifyCors, {
  origin: true, // Set to true to allow all origins
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
});



fastify.addHook('onRequest', (req, res, done) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  done();
});



fastify.register(require("../router/user_route"), { prefix: "/api" });

fastify.listen({ port: 4000 }, () =>
  console.log(`
Server will be ready at: http://localhost:4000
`)
);
