import {
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
    uploadphoto,
} from "../controller/prodcateg_controller";
import { FastifyInstance, FastifyPluginOptions, FastifyDoneCallback } from "fastify";

export default function (fastify: FastifyInstance, opts: FastifyPluginOptions, done: FastifyDoneCallback): void {
    fastify.post("/uploadphoto", uploadphoto);
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
}