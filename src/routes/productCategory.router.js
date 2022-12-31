const productCategory = require('express').Router()
const { getAllProductCategory, getProductCategoryById, createProductCategory, updateProductCategory, deleteProductCategory} = require('../controller/productCategory.controller')

productCategory.get('/', getAllProductCategory)
productCategory.get('/:id', getProductCategoryById)
productCategory.post('/', createProductCategory)
productCategory.patch('/:id', updateProductCategory)
productCategory.delete('/:id', deleteProductCategory)

module.exports = productCategory