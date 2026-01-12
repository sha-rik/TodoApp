let Todo = require('../models/todo');
let User = require('../models/userModel');

exports.createTodo = async (req, res) => {
    try {
        let { title, description } = req.body;
        
        let response = await Todo.create(
            {
                title,
                description,
                userId: req.user.id,
            }
        );
        
        
        res.status(201).json({
            success: true,
            data: response, 
            message: 'Todo created successfully',
        });
    } catch (error) {
        res.status(500)
        .json({
            
            error: error.message,
            
        });
    }
}

exports.deleteTodo = async (req, res) => {
    try{
        let user = await User.findById(req.user.id);
        let id = req.params.id;
        let todoItem = await Todo.findByIdAndDelete({_id: id});
        if(!todoItem){
            return res.status(404).json({
                success: false,
                message: `Todo item not found for id: ${id}`,
            });
        }
        res.status(200).json({
            success: true,
            data: todoItem,
            message: `Todo item with Id: ${id} has been deleted successfully`,
        });
    }
    catch (error) {
        res.status(500).json({
            error: error.message,
            message: 'Error while deleting todo item',
        });
    }
}

exports.getTodo = async (req,res) => {
    try{
        // sare todo item fetch ho gaye

        let todos = await Todo.find({});

        res.status(200).json({
            success: true,
            data: todos,
            message: 'Todos fetched successfully',
        });
    }
    catch(error){
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error',
        });
    }
}

exports.getTodoById = async (req,res) => {
    try{
        let todoItem = await Todo.find({ userId: req.user.id });
        if(!todoItem){
            return res.status(404).json({
                success: false,
                message: `Todo item not found for given user`
            });
        }
        
        res.status(200).json({
            success: true,
            data: todoItem,
            message: 'Todo item fetched successfully',
        });
    }
    catch(error){
        res.status(500).json({
            error: error.message,
            message: 'Internal Server Error',
        })
    }
}

