//server creation
// 1. http module
const http = require('http');

// 2. fs module
const fs = require('fs');

const server = http.createServer((req,res) => {
  console.log("server created")
	//	console.log(req.method);
	//	console.log(req.url);

	// res.setHeader('Content-Type','text/plain');
	// res.write('Hello Sudhanshu');


	res.setHeader('Content-Type','text/html');
	// res.write('<h1>Hello Sudhanshu</h1>');
	// res.end();

	// fs.readFile('./view/index.html',(err,fileData) => {
	// 	if(err){
	// 		console.log("error --> ",err);
	// 	}else{
	// 		// res.write(fileData);
	// 		// res.end();
	// 		res.end(fileData);
	// 	}
	// })


	let path = './view';

	//routing in node js
	switch(req.url){
		case '/':
			path += '/index.html'
			res.statusCode = 200
			break;
		case '/about':
			path +=  '/about.html'
			res.statusCode = 200
			break;
		//redirect
		case '/about-me':
			res.setHeader('Location','/about')
			//301 -->	moved permanently
			res.statusCode = 301
			res.end();
			break;

		default:
			path += '/404.html'
			//change status code as per requiremnet
			res.statusCode = 404
			break;
	}

	


	fs.readFile(path,(err,fileData) => {
		if(err){
			console.log("error --> ",err);
		}else{
			// res.write(fileData);
			// res.end();
			res.end(fileData);
		}
	})

	
})

//port number , host , callback func
server.listen(3000,'localhost', () => {
  console.log('server listening on 3000');
})