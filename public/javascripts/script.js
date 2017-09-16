$(document).ready(function () {

    var url = '/student/api';

    var getCurrentTime = function() {

        return Date.now();

    }

    var listRequest = function (postData, jtParams) {

        return $.Deferred(function ($dfd) {
            $.ajax({
                url: url + '?jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize,
                type: 'GET',
                success: function (data) {
                    $dfd.resolve(data);
                },
                error: function () {
                    $dfd.reject();
                }
            });
        });

    }

    var createRequest = url;

    var updateRequest = function (postData, jtParams) {

        return $.Deferred(function ($dfd) {
            $.ajax({
                url: url,
                type: 'PUT',
                dataType: 'json',
                data: postData,
                success: function (data) {
                    $dfd.resolve(data);
                },
                error: function () {
                    $dfd.reject();
                }
            });
        });

    }

    var deleteRequest = function (postData, jtParams) {

        return $.Deferred(function ($dfd) {
            $.ajax({
                url: url,
                type: 'DELETE',
                dataType: 'json',
                data: postData,
                success: function (data) {
                    $dfd.resolve(data);
                },
                error: function () {
                    $dfd.reject();
                }
            });
        });

    }


    $('#student-table').jtable({
        title: 'Student list',
        paging: true,
        actions: {
            listAction: listRequest,
            createAction: createRequest,
            updateAction: updateRequest,
            deleteAction: deleteRequest
        },
        jqueryuiTheme: true,
        fields: {
            StudentID: {
                title: 'Student ID',
                defaultValue: getCurrentTime(),
                key: true,
                width: '20%',
                create: true,
                edit: false
            },
            Name: {
                title: 'Name',
                width: '20%'
            },
            Gender: {
                title: 'Gender',
                options: {

                    'Male': 'Male',
                    'Female': 'Female'

                },
                width: '20%'

            },
            Birth: {
                title: 'Date of birth',
                width: '20%',
                display: function(data){

                    return new Date(data.record.Birth).toLocaleDateString('en-GB');

                }
            },
            BeginDate: {
                title: 'Begin date',
                width: '20%',
                display: function(data){

                    return new Date(data.record.BeginDate).toLocaleDateString('en-GB');

                }

            }
            
        },

        formCreated: function(event,data) {

            data.form.find('input[name=BeginDate], input[name=Birth]').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate','today');
            data.form.find('input[name=StudentID]').attr('readonly',true);
        }
    });

    $('#student-table').jtable('load');
});