const chat = require('express').Router()
const { getAllChat, getChatById, createChat, updateChat, deleteChat} = require('../controller/chat.controller')

chat.get('/', getAllChat)
chat.get('/:id', getChatById)
chat.post('/', createChat)
chat.patch('/:id', updateChat)
chat.delete('/:id', deleteChat)

module.exports = chat