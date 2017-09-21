var Student = require('../models/Student');
var api = {};

api.list = function (req, res) {

    console.log('list request');
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
    console.log('get id = ' + id);

    Student.findById(id).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            if (doc == null)
                res.status(404).json({

                    msg: 'student not found'

                })
            else
                res.status(200).json({

                    data: doc

                })

        }


    })


}

api.create = function (req, res) {

    console.log('add data: ');
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
    console.log('update id = ' + id);
    console.log('update data: ');
    console.log(req.body);
    Student.findByIdAndUpdate(id, req.body, { new: true }).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            if (doc == null)
                res.status(404).json({

                    msg: 'student not found'

                })
            else
            res.status(200).json({ msg: 'updated'});

        }

    })


}

api.delete = function (req, res) {

    var id = req.params.id;
    console.log('delete id = ' + id);
    Student.findByIdAndRemove(id).exec(function (err, doc) {

        if (err) {
            console.log(err);
            res.status(500).send();
        }
        else {

            console.log(doc);
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