const express = require('express')
const app = express();

//middleware functiun --> POST --> Convert the data from frontend into JSON
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

//GET
app.get('/users',(req,res)=>{
	res.send(users);
})

//POST
app.post('/users',(req,res)=>{
	console.log(req.body);
	users.push(req.body);
	res.json({
		message:'Data received successfully',
		user:req.body
	})
});

//PATCH
app.patch('/users',(req,res)=>{
	const id = req.body.id;
	let data = users.find(data => data.id === id);
	data.name = req.body.name;

	res.json({
		message:"Data Updated successfully"
	})
})

//DELETE
app.delete('/users',(req,res)=>{
	const id = req.body.id;

	let data = users.filter(data => data.id != id);
	users = data;

	res.json({
		message:"Data deleted successfully"
	})
})


//GET with params
app.get('/users/:id',(req,res)=>{
	console.log(req.params.id);
	let paramID = req.params.id;
	let data = users.filter(data => data.id == paramID);
	
	res.json({
		message:"User id received",
		data
	})
})


//GET with query
app.get('/user',(req,res)=>{
	console.log("i m here -->");
	console.log(req.query);
	res.send(users)
})
