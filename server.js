const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');

const initializePassport = require('./config/passport');
initializePassport(passport);

const users = []; // Will hold user information here instead of forwarding it to a database.  Not something you want to do in a production application.

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false })); // Telling our application to take our information from the forms and access them through the request variable inside the server.js file.

app.get('/', (request, response) => {
	response.render('index.ejs', { name: 'Rashad' });
});

// LOGIN

app.get('/login', (request, response) => {
	response.render('login.ejs');
});

app.post('/login', (request, response) => {});

// REGISTER
app.get('/register', (request, response) => {
	response.render('register.ejs');
});

app.post('/register', async (request, response) => {
	try {
		const hashedPassword = await bcrypt.hash(request.body.password, 10);
		users.push({
			id: Date.now().toString(), // Unique identifier
			name: request.body.name,
			email: request.body.email,
			password: hashedPassword,
		});
		response.redirect('/login');
	} catch {
		response.redirect('/register');
	}

	console.log(users);
});

app.listen(3000);
