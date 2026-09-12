import mongoose from "mongoose";
import { productModel } from "../models/productModel";
import { json } from "express";

const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock, } = req.body;

        if (!name || !description || !price || !category || stock === undefined) {
            return res.status(400).json({ message: "All felds are required" });
        }

        const product = await productModel.create({
            name, description, price, category, stock,
            ownerId: req.user._id,
            published: false
        });

        res.status(201).json({ message: "Product created successfully", data: product });
    } catch (error) {
        res.status(500).json({ message: error.message || "something went wrong" });
    }
};

const getProducts = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, sort, page = 1, limit = 10 } = req.query;
        let filter = {};
        if (req.user.role === "ADMIN") {
            filter.ownerId = req.user._id;

        } else {
            filter.published = true;
        }
        if (category) {
            filter.category = category;

        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) {
                filter.price.$gte = Number(minPrice);
            }
            if (maxPrice) {
                filter.price.$lte = Number(maxPrice);
            }
        }
        const skip = (Number(page) - 1) * Number(limit);
        let sortOption = {
            createAt: -1
        };
        if (sort === "price_asc") {
            sortOption = {
                price: 1
            };
        } else if (sort === "price_desc") {
            sortOption = {
                price: -1
            };
        } else if (sort === "newest") {
            sortOption = {
                createAt: -1
            };
        }
        const products = await productModel
            .find(filter)
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));
        res.status(200).json({
            message: "Products fetched successfully",
            data: products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};



const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid products ID"
            });
        }
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"

            });
        }
        if (req.user.role === "ADMIN") {
            if (product.ownerId.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: "You can access only your own products"
                });
            }
        }
        else {
            if (!product.published) {
                return res.status(404).json({
                    message: "Products not found"

                });
            }

        }
        res.status(200).json({
            message: "Product fetched successfully ",
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }

};




const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            name, description, price, category, stock } = req.body;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid products ID"
            });
        }
        const products = await productsModel.findById(id);
        if (!products) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        if (product.ownerId.toString() !== req.user._.toString()) {
            return res.status(403).json({
                message: "You can update only your own product"
            });
        }
        product.name = name ?? product.name;
        product.description = description ?? product.description;
        product.price = price ?? product.price;
        product.category = category ?? product.category;
        product.stock = stock ?? product.stock;
        const updateProduct = await product.save();
        res.status(200).json({
            message: "Product updated successfully",
            data: updateProduct
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteProduct = async (req, res) => {
    try {

        const { id } = req.params;


        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).json({
                message: "Invalid product ID"
            });

        }


        const product = await productModel.findById(id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        // Ownership check
        if (product.ownerId.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "You can delete only your own product"
            });

        }


        await productModel.findByIdAndDelete(id);


        res.status(200).json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



const publishProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid product ID"
            });
        }
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        if (product.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: "You can publish only your own product"
            });
        }
        product.published = true;
        await product.save();
        res.status(200).json({
            message: "product published successfully",
            data: product
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};



const unpublishProduct = async (req, res) => {
    try {

        const { id } = req.params;


        if (!mongoose.isValidObjectId(id)) {

            return res.status(400).json({
                message: "Invalid product ID"
            });

        }


        const product = await productModel.findById(id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }


        // Ownership check
        if (product.ownerId.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                message: "You can unpublish only your own product"
            });

        }


        product.published = false;

        await product.save();


        res.status(200).json({
            message: "Product unpublished successfully",
            data: product
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



export {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    publishProduct,
    unpublishProduct

};