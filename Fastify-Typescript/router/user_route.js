const fastifyMultipart = require('@fastify/multipart');
const {
  createproduct,
  getproducts,
  getproduct,
  updateproduct,
  deleteproduct,
  createcategory,
  getcategories,
  getcategory,
  updatecategory,
  deletecategory,
} = require("../controller/prodcateg_controller");
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("req", req, "file", file);

    cb(null, '../uploads')
  },
  filename: (req, file, cb) => {
    console.log("req", req, "file", file);
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const uploud = multer({ storage: storage })
module.exports = function (fastify, opts, done) {
  fastify.register(fastifyMultipart);
  fastify.post("/uploadphoto", {}, uploud.single('image'), (req, rep) => { console.log("uploadedreq", req); rep.send("uploaded") });
  fastify.get("/products", getproducts);
  fastify.get("/product/:id", getproduct);
  fastify.post("/product", createproduct);
  fastify.put("/product/:id", updateproduct);
  fastify.delete("/product/:id", deleteproduct);
  fastify.get("/categories", getcategories);
  fastify.get("/category/:id", getcategory);
  fastify.post("/category", createcategory);
  fastify.put("/category/:id", updatecategory);
  fastify.delete("/category/:id", deletecategory);
  done();
};
