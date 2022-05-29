const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json()); //global middleware
app.listen(3000);

//auth mini app
const authRouter = express.Router();


app.use('/auth',authRouter);//global middleware

// ********************************************************

// authRouter
// 	.route('/signup')
// 	.get(middleware,getSignUp)
// 	.post(postSignUp);



// //middleware funtion
// function middleware(req,res,next){
// 	console.log('middleware encountered');
// 	next();
// }
// function getSignUp(req,res){
// 	res.sendFile('C:/Users/0103e/Desktop/PepCoding/DEV from Scrach/MERN/Lesson-6/Public/signup.html');
// }

// ********************************************************

authRouter
	.route('/signup')
	.get(middleware1,getSignUp,middleware2)
	.post(postSignUp);


//path specific midleware
//middleware funtion
function middleware1(req,res,next){
	console.log('middleware1 encountered');

	//req,res carry forward ho jata hai next middleware ko next() se
	next();
}
function middleware2(req,res){
	console.log('middleware2 encountered');
	res.sendFile('C:/Users/0103e/Desktop/PepCoding/DEV from Scrach/MERN/Lesson-6/Public/signup.html');
	console.log('middleware2 ended req-res cycle');
}
function getSignUp(req,res,next){
	console.log("getsignup called")
	next();
}


// ********************************************************




function postSignUp(req,res){
	let data = req.body;
	console.log(data);

	res.json({
		message:"User Signed up",
		data
	})
}