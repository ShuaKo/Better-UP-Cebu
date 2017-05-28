const express = require('express');
const bodyparser = require('body-parser');
const consolidate = require('consolidate');
const Teacher = require('./models').Teacher;

const app = express();

app.engine('html', consolidate.nunjucks);
app.set('views', './views');

app.use(bodyparser.urlencoded({ extended: true}));
app.use('/static', express.static('./static'));

app.get('/', function(req, res) {
	res.render('index.html');
});

app.get('/add_teacher', function(req, res) {
	res.render('addteacher.html');
});

app.get('/update_teacher', function(req, res) {
	res.render('updateTeacher.html');
});

app.get('/update_avatar', function(req, res) {
	res.render('updateAvatar.html');
});

app.post('/add_teacher', function(req, res){
	const name = req.body.name;
	const course_graduated = req.body.course_graduated;
	const description = req.body.description;
	const consultation = req.body.consultation;

	Teacher.create({name: name, course_graduated: course_graduated, description: description, consultation: consultation}).then(function() {
		res.redirect('/update_avatar');
	});
});

app.post('/update_teacher', function(req, res){
	const name = req.body.name;
	const course_graduated = req.body.course_graduated;
	const description = req.body.description;
	const consultation = req.body.consultation;
	// const id = req.body.id;
	Teacher.update({name: name, course_graduated: course_graduated, description: description, consultation: consultation}, {where:{ name: name}}).then(function() {
		res.render('updateAvatar.html');
	});
});

app.get('/delete_teacher', function(req, res){
	const name = req.query.name;
	// const id = req.query.id;
	console.log(req.query);
	Teacher.destroy({where:{ name: name}}).then(function() {
		res.redirect('/');
	});
});

app.listen(3000, function(){
	console.log('Running at port 3000');
});