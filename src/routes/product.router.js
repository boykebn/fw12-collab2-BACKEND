const product = require('express').Router()
const {getAllProducts, getProductById, getProductsByCategory, createProduct, updateProduct, deleteProduct} = require('../controller/product.controller')

product.get('/', getAllProducts)
product.get('/category/:category', getProductsByCategory)
product.get('/:id', getProductById)
product.post('/', createProduct)
product.patch('/:id', updateProduct)
product.delete('/:id', deleteProduct)

module.exports = product