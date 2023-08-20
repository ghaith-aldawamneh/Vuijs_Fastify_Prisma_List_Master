
const path = require('path');
const fs = require('fs');

module.exports.createproduct = async function (req, reply) {
  try {
    const isContentTypeJson = req.headers['content-type'] !== 'application/json';
    const DATA = isContentTypeJson ? JSON.parse(req.body) : req.body;
    const newProduct = await prisma.Product.create({ data: DATA, });
    let Category = await prisma.Category.findUnique({ where: { id: Number(DATA.category_id) } });
    //Category.products = [newProduct]
    if (Category) {
      const updatedCategory = await prisma.Category.update({
        where: { id: Category.id },
        data: { products: { connect: [{ id: newProduct.id }] } },
      });
    }
    reply.code(201).send(newProduct);
  }
  catch (error) {
    console.error("Error:", error);
  }
};

module.exports.getproducts = async function (req, reply) {
  const Products = await prisma.Product.findMany();
  reply.send(Products);
};

module.exports.getproduct = async function (req, reply) {
  const { id } = req.params;
  const Product = await prisma.Product.findUnique({
    where: { id: Number(id) },
  });
  reply.send(Product);
};

module.exports.updateproduct = async function (req, reply) {
  const { id } = req.params;
  const DATA = JSON.parse(req.body);
  const updatedProduct = await prisma.Product.update({
    where: { id: Number(id) }, data: DATA,
  });
  reply.send(updatedProduct);
};

module.exports.deleteproduct = async function (req, reply) {
  const { id } = req.params;
  const deletedProduct = await prisma.Product.delete({
    where: { id: Number(id), },
  });
  reply.send(deletedProduct);
};


//////////Category//////////////

const prisma = require("../src/connection");

module.exports.createcategory = async function (req, reply) {
  const isContentTypeJson = req.headers['content-type'] !== 'application/json';
  const DATA = isContentTypeJson ? JSON.parse(req.body) : req.body;

  //if (parent_id) { DATA.parent_id = parent_id; }
  const newCategory = await prisma.Category.create({ data: DATA });
  console.log("newCategory", newCategory)
  reply.code(201).send(newCategory);
};

module.exports.getcategories = async function (req, reply) {
  const Categories = await prisma.Category.findMany({ include: { products: true, children: true }, });
  reply.send(Categories);
};

module.exports.getcategory = async function (req, reply) {
  const { id } = req.params;
  const Category = await prisma.Category.findUnique({ include: { products: true, children: true }, where: { id: Number(id) } });
  reply.send(Category);
};

module.exports.updatecategory = async function (req, reply) {
  const { id } = req.params;
  const DATA = JSON.parse(req.body);
  const updatedCategory3 = await prisma.Category.update({
    where: { id: Number(id), },
    data: DATA,
  });
  reply.send(updatedCategory3);
};

module.exports.deletecategory = async function (req, reply) {
  const { id } = req.params;
  try {
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
      include: {
        children: {
          include: {
            children: true, // Include sub-subcategories recursively
            products: true, // Include products for subcategories
          },
        },
        products: true,
      },
    });
    if (!category) {
      return reply.status(404).send({ error: 'Category not found' });
    }
    const mainCategoryProductIds = category.products.map(product => product.id);
    await prisma.Product.deleteMany({
      where: { id: { in: mainCategoryProductIds } },
    });

    async function deleteSubcategories(category) {
      for (const subcategory of category.children) {
        // Recursively delete sub-subcategories and products

        // Delete products
        if (subcategory.products) {
          const subcategoryProductIds = subcategory.products.map(product => product.id);
          await prisma.Product.deleteMany({
            where: { id: { in: subcategoryProductIds } },
          });
        }
        if (subcategory.children) {
          await deleteSubcategories(subcategory);
        }
        // Delete subcategory
        await prisma.Category.delete({
          where: { id: subcategory.id },
        });

      }
    }
    if (category.children) {
      await deleteSubcategories(category);
    }
    // Delete main category
    await prisma.Category.delete({
      where: { id: category.id },
    });
    reply.send({ message: 'Category and related subcategories/products deleted successfully' });
  } catch (error) {
    console.error("Error:", error);
  }
};


module.exports.uploadphoto = async function (req, reply) {
  //const { id } = req.params;
  //const DATA = JSON.parse(req.body);
  try {
    const { image } = req.files;
    const fileName = `${Date.now()}_${image.filename}`;
    const uploadPath = path.join(__dirname, 'uploads', fileName);
    await fs.writeFile(uploadPath, image.data); // Use fs.writeFile
    reply.code(200).send({ message: 'Image uploaded successfully' });
  } catch (error) {
    console.log('Error uploading image:', error);
    reply.code(500).send({ message: 'Error uploading image' });
  }

};
