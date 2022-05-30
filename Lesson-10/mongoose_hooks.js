const mongoose = require('mongoose');
const express = require('express');
const emailValidator = require('email-validator');

const app = express();
app.use(express.json());
app.listen(3000);


//miniapp
const userRouter = express.Router();
//base route, router to use
app.use('/user',userRouter);

//GET,POST,PATCH,DELETE
userRouter
	.route('/')
	.get(getUsers)
	.post(postUser)
	.patch(updateUser)
	.delete(deleteUser);

//Connect Atlas
const db_link = 'mongodb+srv://Admin:JXyGZtAXPwgbgigu@cluster0.aa48y.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
	.then(function(db){
		// console.log(db);
		console.log("DB Connected");
	})
	.catch(function(err){
		console.log(err);
	});

//Create Schema
const userSchema = mongoose.Schema({
	name:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true,
		unique:true,
		validate:function(){
			return emailValidator.validate(this.email);
		}
	},
	password:{
		type:String,
		required:true,
		minLength:8
	},
	confirmPassword:{
		type:String,
		required:true,
		minLength:8,
		validate:function(){
			return this.confirmPassword === this.password;
		}
	}
})

// *************************************************************************************
//mongoose hooks
userSchema.pre('save',async function(){
	console.log("Before saving into database",this)
	this.confirmPassword = undefined;
});

userSchema.post('save',async function(doc){
	console.log('After saving into database',doc);
});

// *************************************************************************************

//Create modal
const userModel = mongoose.model('userModel',userSchema)

//getUser function
async function getUsers(req,res){
	let allUsers = await userModel.find();
	// let allUsers = await userModel.findOne({name:'Abhimanyu'});
	res.json({
		message:"list of All users",
		data:allUsers
	})
}

//create user
async function postUser(req,res){
	let dataObj = req.body;
	try{
	let user = await userModel.create(dataObj);
	res.json({
		message:"User signed up",
		data:user
	})
	}catch(err){
		res.json({
			message:"User sign up failed",
			error:err
		})
	}
}

//update user
async function updateUser(req,res){
	let datatobeupdated = req.body;
	let user = await userModel.findOneAndUpdate({email:datatobeupdated.email},datatobeupdated);

	res.json({
		message:"Data updated successfully"
	});
}

//delete user
async function deleteUser(req,res){
	let usertobedeleted = req.body;
	console.log(usertobedeleted)
	let user = await userModel.findOneAndDelete({email:usertobedeleted.email});

	res.json({
		message:"User deleted successfully",
		user
	})
}


