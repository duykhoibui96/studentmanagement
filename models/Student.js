var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema ({

    StudentID: {

        type: 'String',
        unique: true

    },

    Gender: String,
    Name: String,
    Birth: String,
    BeginDate: String

},{ collection: 'Student'});

mongoose.exports = mongoose.model('Student',StudentSchema);