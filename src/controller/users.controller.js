const {
    createUsers,
    getUsers,
    getUserByid,
    updateUser,
    deleteUser,
} = require('../models/users.model');

const errorHandler = require('../helper/errorHandler.helper');



exports.createUsers = async (req, res) => {
    try {
        const user = await createUsers(req.body);
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            results: user,
        })
    } catch (error) {
        if (error) return errorHandler(error, res);
    }
};


exports.getUsers = async (req, res) => {
    try {
        const Users = await getUsers();
        res.status(200).json({
            success: true,
            message: 'All users retrieved successfully',
            results: Users
        })
    } catch (error) {
        if (error) return errorHandler(error, res);
    }
};


exports.getUserById = async (req, res) => {
    try {
        const user = await getUserByid(req.params.id);
        res.status(200).json({
            success: true,
            message: 'user retrieved successfully',
            results: user
        })
    } catch (error) {
        if(error)return errorHandler(error, res)
    }
}


exports.updateUser = async (req, res) => {
    try {
        const user = await updateUser(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: 'User updated',
            results: user
        })
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        res.status(200).json({
            success: true,
            message: 'User deleted',
            results: user
        })
    } catch (error) {
        if (error) return errorHandler(error, res)
    }
};
