var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SensorSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Sensor', SensorSchema);
