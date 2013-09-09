var index = require('./controllers/index');

module.exports = function(app) {
	//console.log(index.render);
	app.get('/',index.render);
}
