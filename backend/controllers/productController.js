const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHanlder')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

// Add Product
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    const product = await Product.create(req.body)

    res.status(201).json({
        success: true,
        product
    })
})

// Get All Products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    
    const apifeatures = new APIFeatures(Product.find(), req.query).search();

    const products = await apifeatures.query;

    res.status(200).json({
        success: true, 
        count: products.length,
        products
    })
})

// Get Single Product
exports.getSingleProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if(!product) {
        return next(new ErrorHandler('Product Not Found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
}

// Update Product
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {

        return res.status(404).json({
            success: false,
            message: 'Product not Found'
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}

// Delete Product
exports.deleteProduct = async (req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product Not Found"
        })
    }

    await product.remove();

    res.status(200).json({
        success: true,
        message: "Product is Deleted"
    })
}