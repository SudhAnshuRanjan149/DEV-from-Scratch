//benefits of express
// 1. Simple Syntax
// 2. easy readable
// 3. easy update
// 4. more secure
// 5. fast
// 6. server side logic
// 7. easy req, res, routing 

const express = require('express');
const app = express();

app.listen(3000);

app.get('/',function(req,res){
	// res.send("Hello world");
	res.sendFile('C:/Users/0103e/Desktop/PepCoding/DEV from Scrach/MERN/Lesson-1/Server_through_nodejs/View/index.html')
})

app.get('/about',function(req,res){
	// res.send("About page");
	res.sendFile('./about.html',{root:__dirname})
})


//redirect
app.get('/about-us',(req,res) => {
	res.redirect('./about');
})

//404 page
//middleware  --> place this in the bottom most
app.use((req,res)=> {
	// res.statusCode = 404;  //ye bhi sahi hai
	res.status(404).sendFile('./404.html',{root:__dirname})
})


// **************************************************************************************
// HTTP methods
	// 1. GET	-->	to get data
	// 2. POST	-->	to send data
	// 3. PATCH	-->	to update data
	// 4. DELETE--> to delete data


