var lobstersRoute = require('./routes/lobsters.js');
var redditRoute = require('./routes/reddit.js');
var hackerRoute = require('./routes/hackernews.js');

module.exports = function(app) {

    // middleware --------------------------------------------------------------
    // could be used in future, if for public
    // app.use('/api', function(req, res, next) {
    //     console.log(req.headers['user-agent'] + ' accessing ' + req.originalUrl);

    //     next();
    // });

	// server routes -----------------------------------------------------------
	// handle things like api calls
	// authentication routes

    app.get('/api', function(req, res) {
        res.json({ message: 'hooray! welcome to our api!' });  
    })

    app.get('/api/hn', hackerRoute.getHN);
    app.get('/api/lb', lobstersRoute.getLB);
    app.get('/api/r/:subreddit', redditRoute.getR);



	// frontend routes ---------------------------------------------------------
	// route to handle all angular requests
	app.get('*', function(req, res) {
		res.sendfile('./public/index.html');
	});

};