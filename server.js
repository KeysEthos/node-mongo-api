var express	= require('express');
var app		= express();
var bodyParser  = require('body-parser');
var methodOverride = require('method-override');

//Connect to DB
var config = require('./config');
var mongoose = require('mongoose');
mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Did you break something jackass?');
});

var Sensor 	= require('./models/sensor');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

var port = process.env.PORT || 8080;

//ROUTES
var router = express.Router();

router.use(function(req, res, next) {
        console.log('Reporting for duty!');
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'torma api!' });   
});

// on routes 
//--------------------------------------------------
router.route('/sensor')
	.post(function(req, res) {
	   var sensor = new Sensor();
            sensor.name = req.body.name;

             sensor.save(function(err) {
	 	if (err)
		  res.send(err);
 	   	    res.json({ message: 'sensor created!' });
		});
   	 })
	.get(function(req, res) {
	    Sensor.find(function(err, sensor) {
	        if (err)
		    res.send(err);
		res.json(sensor);
	    });
	});

router.route('/sensor/:_id')
	.get(function(req, res) {
	  Sensor.findById(req.params._id, function(err, sensor) {
	    if (err)
	      res.send(err);
	    res.json(sensor);
	   });
	})
	.post(function(req, res) {
	  Sensor.findById(req.params._id, function(err, sensor) {
	    if (err)
	      res.send(err);

		sensor.name = req.body.name;

	    sensor.save(function(err) {
	      if (err)
		res.send(err);
	      res.json({ message: 'Sensor Updated' });
	     });
	   });
	})
	.delete(function(req, res) {
	  Sensor.remove({
	    _id: req.params._id
	  }, function (err, sensor) {
	    if (err)
	      res.send(err);
		res.json({ message: 'That shits deleted' });
	    });
	  });
	    
app.use('/api', router);

app.listen(port);
console.log('Mmmmm ' + port);
