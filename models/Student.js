var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema ({

    StudentID: {

        type: String,
        unique: true

    },

    Gender: String,
    Name: String,
    Birth: Date,
    BeginDate: Date

},{ collection: 'Student'});


module.exports = mongoose.model('Student',StudentSchema);