//Make more readable, remove redundancies
//Create a Mini-App
const express = require('express');
const app = express();
app.use(express.json());
app.listen(3000);


let users = [
	{
		"id":1,
		"name":"Sudhanshu"
	},
	{
		"id":2,
		"name":"Rahul"
	}
];


//miniapp
const userRouter = express.Router();
//base route, router to use
app.use('/user',userRouter);

//GET,POST,PATCH,DELETE
userRouter
	.route('/')
	.get(getUser)
	.post(postUser)
	.patch(updateUser)
	.delete(deleteUser);

//GET by ID
userRouter
	.route('/:id')
	.get(getUserByID);


//functions
function getUser(req,res){
	res.send(users);
}
function postUser(req,res){
	console.log(req.body)
	users.push(res.body);
	res.json({
		message:"Data received successfully",
		user:req.body
	})
}
function updateUser(req,res){
	const id = req.body.id;
	let data = users.find(data => data.id === id);
	data.name = req.body.name;

	res.json({
		message:"Data Updated successfully"
	})
}
function deleteUser(req,res){
	const id = req.body.id;

	let data = users.filter(data => data.id != id);
	users = data;

	res.json({
		message:"Data deleted successfully"
	})
}
function getUserByID(req,res){
	console.log(req.params.id);
	let paramID = req.params.id;
	let data = users.filter(data => data.id == paramID);
	
	res.json({
		message:"User id received",
		data
	})
}