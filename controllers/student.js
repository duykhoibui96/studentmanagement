var Student = require('../models/Student');
var api = {};

api.list = function (req, res) {

    Student.find().exec(function (err, docs) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            res.status(200).json({

                data: docs

            })

        }



    })


}

api.get = function (req, res) {

    var id = req.params.id;

    Student.findById(id).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            if (doc == null)
                res.status(404).json({

                    msg: 'not found'

                })
            else
                res.status(200).json({

                    data: doc

                })

        }


    })


}

api.create = function (req, res) {

    console.log(req.body);
    var newStudent = new Student(req.body);

    newStudent.save(function(err) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            res.status(200).json({ msg: 'added'});

        }


    })

}

api.update = function (req, res) {

    var id = req.params.id;
    Student.findByIdAndUpdate(id, req.body, { new: true }).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            if (doc == null)
                res.status(404).json({

                    msg: 'not found'

                })
            else
            res.status(200).json({ msg: 'updated'});

        }

    })


}

api.delete = function (req, res) {

    Student.findByIdAndRemove(req.params.id).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            if (doc == null)
                res.status(404).json({

                    message: 'not found'

                })
            else
                res.status(200).json({ msg: 'deleted'});

        }

    })


}

module.exports = api;