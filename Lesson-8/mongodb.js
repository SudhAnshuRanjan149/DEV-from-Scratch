//pass --> JXyGZtAXPwgbgigu

const mongoose = require('mongoose');

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
		unique:true
	},
	password:{
		type:String,
		required:true,
		minLength:8
	},
	confirmPassword:{
		type:String,
		required:true,
		minLength:8
	}
})

//Create modal
const userModel = mongoose.model('userModel',userSchema)


//create user (iife--> immediately invoked function expression)
async function createUser(){
	let user = {
		name:"Abhimanyu",
		email:"abc@gmail.com",
		password:'12345678',
		confirmPassword:'12345678'
	};

	let data = await userModel.create(user);
	console.log(data);
}
createUser();
