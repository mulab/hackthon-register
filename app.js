var logger = require('koa-logger');
var koa = require('koa');
var route = require('koa-route');
var json = require('koa-json');
var parse = require('co-body');
var views = require('koa-views');
var serve = require('koa-static');
var csrf = require('koa-csrf');

var app = koa();
app.keys='secret';
app.use(logger());

views(app, 'html')
    .map('mustache', 'html');
app.use(serve('static'));
app.use(json());
app.use(route.get('/', function * (next) {
    this.body = yield this.render('index', {csrf:this.csrf});
}));

app.listen(3001);