var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

var entries = [];

app.local.entries = entries;

app.use(logger("dev"));

app.use(bodyParser.urlencoded({extended:false}));

app.get("/", function(req, res)
{
	res.render("index");
});

app.get("/new-entry", function(req, res)
{
	res.render("new-entry");
});

app.post("/new-entry", function(req, res)
{
	if(!req.body.title||req.body.body)
	{
		res.status(400).send("Entries must have some text.");
		return;
	}
	entries.push(
	{
		title:req.body.title,
		content:req.body.body,
		published:new Date()
	});
	responce.redirect("/");
});

app.use(function(req,res)
{
	res.status(404).render("404");
});

http.createServer(app).listen(3000, function()
{
	console.log("Game library server started on port 3000");
});

