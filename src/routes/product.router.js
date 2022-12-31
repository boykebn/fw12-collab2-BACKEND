const product = require('express').Router()
const {getAllProducts, getProductById, createProduct, updateProduct, deleteProduct} = require('../controller/product.controller')

product.get('/', getAllProducts)
product.get('/:id', getProductById)
product.post('/', createProduct)
product.patch('/:id', updateProduct)
product.delete('/:id', deleteProduct)

module.exports = product