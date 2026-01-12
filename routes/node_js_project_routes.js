let express = require('express');
let router = express.Router();

// importing controllers
let {signup,login} = require(`../controllers/auth`);
let {createTodo, getTodo, getTodoById,deleteTodo} = require(`../controllers/todos`);

// importing middleware
let {auth,isAdmin,isStudent} = require('../middleware/auth');
// importing middleware

// maping routes to controllers

router.post('/signup', signup);
router.post('/login', login);

// middleware 
router.post('/student/createTodo', auth,isStudent,createTodo);
router.delete('/student/deleteTodo/:id', auth,isStudent,deleteTodo);
router.get('/student/getTodoById', auth,isStudent,getTodoById);
router.get('/admin/getTodo', auth,isAdmin,getTodo);

// middleware


module.exports = router;
