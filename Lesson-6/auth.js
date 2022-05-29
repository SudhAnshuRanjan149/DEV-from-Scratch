const express = require('express');
const res = require('express/lib/response');
const app = express();
app.use(express.json());
app.listen(3000);

//auth mini app
const authRouter = express.Router();


app.use('/auth',authRouter);

authRouter
	.route('/signup')
	.get(getSignUp)
	.post(postSignUp);


function getSignUp(req,res){
	res.sendFile('./Public/signup.html',{root:__dirname});
}
function postSignUp(req,res){
	let data = req.body;
	console.log(data);

	res.json({
		message:"User Signed up",
		data
	})
}
