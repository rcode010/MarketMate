import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products || products.length === 0) {
      res.status(400).json({
        success: false,
        message: "No product found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "products",
      products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};

export const getAProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.find({ id });
    if (!products) {
      res.status(400).json({
        success: false,
        message: "No product found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "products",
      products,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
      const { store, name, stock, price, category, image } = req.body;
      console.log(image)
    let cloudinaryResponse = null;

    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {
        folder: "products",
      });
    }
    console.log(cloudinaryResponse)
    const createProd = await Product.create({
      store,
      name,
      stock,
      price,
      category,
      image: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
    });
    if (!createProd) {
      return res.json({
        success: false,
        message: "Error while creating product",
      });
    }
    res.json({
      success: true,
      message: "product created successfully",
      product: createProd,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};

//put method for the product

export const deleteProduct = async (req, res) => {
  try {
    const { id } = body.params;

    const deleteProduct = await Product.findById(id);
    if (!deleteProduct) {
      return json.status(404).json({
        success: false,
        message: "no product found to delete",
      });
    }
    if (deleteProduct.image) {
      try {
        const publicId = deleteProduct.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`products/${publicId}`);
      } catch (error) {
        console.log("error deleting image from cloudinary");
      }
    }
    await Product.findByIdAndDelete(id);
    res.json({
      success: true,
      message: "product deleted successfully",
      product: deleteProduct,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};
