var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema ({

    gender: String,
    name: String,
    age: Number

},{ collection: 'Student'});


module.exports = mongoose.model('Student',StudentSchema);