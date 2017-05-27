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

app.post('/add_teacher', function(req, res){
	const name = req.body.name;
	const course_graduated = req.body.course_graduated;
	const description = req.body.description;
	const consultation = req.body.consultation;

	console.log(req.body);
	Teacher.create({name: name, course_graduated: course_graduated, description: description, consultation: consultation}).then(function() {
		res.redirect('/');
	});
});

app.listen(3000, function(){
	console.log('Running at port 3000');
});