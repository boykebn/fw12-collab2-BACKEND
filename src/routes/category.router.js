const category = require('express').Router()
const { getAllCategory, getCategoryById, createCategory, updateCategory, deleteCategory} = require('../controller/category.controller')

category.get('/', getAllCategory)
category.get('/:id', getCategoryById)
category.post('/', createCategory)
category.patch('/:id', updateCategory)
category.delete('/:id', deleteCategory)

module.exports = category