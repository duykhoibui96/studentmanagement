var Student = require('../models/Student');
var api = {};

api.list = function (req, res) {

    Student.find().exec(function (err, docs) {

        if (err) {
            console.log(err);
            res.json({

                Result: 'ERROR',
                Message: err

            })
        }
        else {

            console.log(docs);
            var startIndex = req.query.jtStartIndex;
            var pageSize = req.query.jtPageSize;

            res.json({

                Result: 'OK',
                TotalRecordCount: docs.length,
                Records: docs.slice(startIndex, startIndex + pageSize)

            })

        }



    })


}

api.get = function (req, res) {

    var id = req.params.id;

    newStudent.findOne({ StudentID: id }).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.json({

                Result: 'ERROR',
                Message: err

            })
        }
        else {
            res.json({

                Result: 'OK',
                Record: doc

            })

        }


    })


}

api.create = function (req, res) {

    var newStudent = new Student(req.body);
    
    newStudent.save(function (err, doc) {

        if (err) {
            console.log(err);
            res.json({

                Result: 'ERROR',
                Message: err

            })
        }
        else {
            res.json({

                Result: 'OK',
                Record: doc

            })

        }


    })

}

api.update = function (req, res) {

    var id = req.body.StudentID;
    var obj = Object.assign(req.body);
    delete obj.StudentID;
    Student.findOneAndUpdate({ StudentID: id }, obj, { new: true }).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.json({

                Result: 'ERROR',
                Message: err

            })
        }
        else {
            res.json({

                Result: 'OK',
                Record: doc

            })

        }

    })


}

api.delete = function (req, res) {

    Student.remove(req.body).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.json({

                Result: 'ERROR',
                Message: err

            })
        }
        else {
            res.json({

                Result: 'OK'

            })

        }

    })


}

module.exports = api;