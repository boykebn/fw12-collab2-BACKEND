const { readAllChat, readChat, createChat, updateChat, deleteChat} = require('../models/chat.model')
const errorHandler = require('../helper/errorHandler.helper')

exports.getAllChat = async (req, res) => {
    try {
        const chat = await readAllChat()
        res.status(200).json({
            success: true,
            message: "All chat retrieved successfully",
            results: chat,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.getChatById = async (req, res) => {
    try {
        const chat = await readChat(req.params.id)
        res.status(200).json({
            success: true,
            message: "chat retrieved successfully",
            results: chat,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.createChat = async (req, res) => {
    try {
      const chat = await createChat(req.body);
      res.status(200).json({
        success: true,
        message: "chat created successfully",
        results: chat,
      });
    } catch (error) {
      if (error) return errorHandler(error, res);
    }
  };
  

exports.updateChat = async (req, res) => {
    try {
        const chat = await updateChat(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: "chat updated successfully",
            results: chat,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}

exports.deleteChat = async (req, res) => {
    try {
        const chat = await deleteChat(req.params.id)
        res.status(200).json({
            success: true,
            message: "chat deleted successfully",
            results: chat,
          });
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
}