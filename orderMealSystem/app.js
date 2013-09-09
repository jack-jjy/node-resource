var Loader = require('loader');
var express = require('express');
var config = require('./config').config;
var app = express();
var partials = require('express-partials')
var routes = require('./routes');

// configuration in all env
app.configure(function () {
  app.use(express.bodyParser());
  app.use(partials());//使express支持ejs的layout
  app.set('views', __dirname + '/views'); //设置模板路径，比如index.jade
  app.engine('.html', require('ejs').__express);
  app.set('view engine', 'html'); //配置模板解析引擎
  app.use(express.cookieParser());
  
  //错误处理，防止服务器down掉
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.send(500, 'Something broke!');
  });
});


app.listen(config.port);
// routes
routes(app);

console.log('server start! listen to ' + config.port);

module.exports = app;
