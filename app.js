var logger = require('koa-logger');
var koa = require('koa');
var route = require('koa-route');
var json = require('koa-json');
var parse = require('co-body');
var views = require('koa-views');
var serve = require('koa-static');
var csrf = require('koa-csrf');
var session = require('koa-session');
var fs = require('fs');
var app = koa();
app.keys=['secret'];
csrf(app);
app.use(session());
app.use(logger());

views(app, 'html')
    .map('mustache', 'html');
app.use(serve('static'));
app.use(json());
app.use(route.get('/', function * (next) {
    this.body = yield this.render('index', {csrf:this.csrf});
}));

app.use(route.post('/',function * (next){
    var body = yield parse(this),
        name = body.Name,
        phone = body.Phone,
        email = body.Email,
        github = body.Github,
        response = this;

    try{
        this.assertCSRF(body);
    } catch (err){
        this.status = 403;
        this.body = {
            message: 'invalid request'
        };
    }

    console.log(body);
    try{
        yield write(name+'\t'+phone+'\t'+email+'\t'+github);
    }catch(err){
        response.status = 403;
        response.body = {
            message: 'invalid request'
        };
    }
    response.status = 200;
    response.body = {
        message: 'ok'
    };

}));

app.listen(3001);

function write(data){
    return function(done){
        fs.writeFile('data/'+Date.now(),data,done);
    }
}