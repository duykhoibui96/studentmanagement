// $(document).ready(function () {

//     var url = '/api/student';

//     var listRequest = function (postData, jtParams) {

//         return $.Deferred(function ($dfd) {
//             $.ajax({
//                 url: url + '?jtStartIndex=' + jtParams.jtStartIndex + '&jtPageSize=' + jtParams.jtPageSize,
//                 type: 'GET',
//                 success: function (data) {
//                     $dfd.resolve(data);
//                 },
//                 error: function () {
//                     $dfd.reject();
//                 }
//             });
//         });

//     }

//     var createRequest = url;

//     var updateRequest = function (postData, jtParams) {

//         return $.Deferred(function ($dfd) {
//             $.ajax({
//                 url: url,
//                 type: 'PUT',
//                 dataType: 'json',
//                 data: postData,
//                 success: function (data) {
//                     $dfd.resolve(data);
//                 },
//                 error: function () {
//                     $dfd.reject();
//                 }
//             });
//         });

//     }

//     var deleteRequest = function (postData, jtParams) {

//         return $.Deferred(function ($dfd) {
//             $.ajax({
//                 url: url,
//                 type: 'DELETE',
//                 dataType: 'json',
//                 data: postData,
//                 success: function (data) {
//                     $dfd.resolve(data);
//                 },
//                 error: function () {
//                     $dfd.reject();
//                 }
//             });
//         });

//     }


//     $('#student-table').jtable({
//         title: 'Student list',
//         paging: true,
//         actions: {
//             listAction: listRequest,
//             createAction: createRequest,
//             updateAction: updateRequest,
//             deleteAction: deleteRequest
//         },
//         jqueryuiTheme: true,
//         fields: {
//             StudentID: {
//                 title: 'Student ID',
//                 key: true,
//                 width: '20%',
//                 create: true,
//                 edit: false
//             },
//             Name: {
//                 title: 'Name',
//                 width: '20%'
//             },
//             Gender: {
//                 title: 'Gender',
//                 options: {

//                     'Male': 'Male',
//                     'Female': 'Female'

//                 },
//                 width: '20%'

//             },
//             Birth: {
//                 title: 'Date of birth',
//                 width: '20%'
//             },
//             BeginDate: {
//                 title: 'Begin date',
//                 width: '20%'

//             }

//         },

//         formCreated: function(event,data) {

//             data.form.find('input[name=BeginDate], input[name=Birth]').datepicker({ dateFormat: 'dd-mm-yy' }).datepicker('setDate','today');
//             data.form.find('input[name=StudentID]').attr('readonly',true);
//             data.form.find('input[name=StudentID]').val(Date.now());
//         }
//     });

//     $('#student-table').jtable('load');
// });

$(document).ready(() => {

    var source = $('#table').html();
    var url = '/api/student';
    var template = Handlebars.compile(source);

    Handlebars.registerHelper('counter', index => index + 1);

    var errorHandler = err => {

        console.log(err);

    }

    var validateTable = records => {

        var html = template({ records: records });
        $('#display').html(html);

    }

    var listStudent = () => 

        $.ajax({
            url: url,
            type: 'GET',
            success: data => validateTable(data.data),
            error: err => errorHandler(err)
        })


    

    var createStudent = newRecord => 

        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: newRecord,
            success: date => listStudent(),
            error: err => errorHandler(err)
        })

    

    var updateStudent = (recordID, updateData) => 

        $.ajax({
            url: url + '/' + recordID,
            type: 'PUT',
            dataType: 'json',
            data: updateData,
            success: date => listStudent(),
            error: err => errorHandler(err)
        })


    var deleteStudent = recordID => 

        $.ajax({
            url: url + '/' + recordID,
            type: 'DELETE',
            success: date => listStudent(),
            error: err => errorHandler(err)
        })


    $('#student-add-form').on('submit', e => { 
        e.preventDefault(); 
        var data = $("#student-add-form :input").serializeArray();
        var submitObj = {};
        data.forEach(item => {
            submitObj[item.name] = item.value
        })
        createStudent(submitObj);
    });

    $('#student-update-form').on('submit', e => { 
        e.preventDefault(); 
        var data = $("#student-update-form :input").serializeArray();
        var submitObj = {};
        var id = null;
        data.forEach(item => {

            if (item.name !== 'id')
                submitObj[item.name] = item.value
            else
                id = item.value;
        })
        updateStudent(id,submitObj);

    });

    $('#student-update-form button').click( () => $('#student-update-form').slideUp());

    $('#display').on('click', '.config span', function(e) {
        
        var obj = $(this).data();
        if (obj.method === 'delete'){
            if (confirm('Do you want to delete this student?'))
                deleteStudent(obj.studentId);
        }
        else{

            var updateForm = $('#student-update-form');
            var studentRecord = $(`tr#${obj.studentId}`);
            updateForm.find('#id').val(obj.studentId);
            updateForm.find('#up-name').val(studentRecord.find('td[data-type=name]').text());
            updateForm.find('#up-gender').val(studentRecord.find('td[data-type=gender]').text());
            updateForm.find('#up-age').val(studentRecord.find('td[data-type=age]').text());
            updateForm.slideDown();
        }

    });

    $('#student-update-form').hide();

    listStudent();



});