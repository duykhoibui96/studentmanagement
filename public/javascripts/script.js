$(document).ready(() => {

    var source = $('#table').html();
    var url = '/api/student';
    var template = Handlebars.compile(source);
    var loading = $('#loading');
    var updateForm = $('#student-update-form');
    var createForm = $('#student-add-form');

    Handlebars.registerHelper('counter', index => index + 1);

    var errorHandler = err => {

        console.log(err);
        loading.hide();
        if (err.responseJSON)
            alert(err.responseJSON.msg);
        else
            alert('Server connection failed');

    }

    var validateTable = records => {

        loading.hide();
        var html = records.length > 0 ? template({ records: records }) : template({ isEmpty: true});
        $('#display').html(html);

    }

    var listStudent = () => {

        loading.show();
        $.ajax({
            url: url,
            type: 'GET',
            success: data => validateTable(data.data),
            error: err => errorHandler(err)
        })

    }
    

    var createStudent = newRecord => {

        loading.show();
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            data: newRecord,
            success: date => listStudent(),
            error: err => errorHandler(err)
        })

    }

    var updateStudent = (recordID, updateData) => {

        loading.show();
        $.ajax({
            url: url + '/' + recordID,
            type: 'PUT',
            dataType: 'json',
            data: updateData,
            success: date => listStudent(),
            error: err => errorHandler(err)
        })

    }

    var deleteStudent = recordID => {

        loading.show();
        $.ajax({
            url: url + '/' + recordID,
            type: 'DELETE',
            success: date => listStudent(),
            error: err => errorHandler(err)
        })

    }

    createForm.on('submit', e => { 
        e.preventDefault(); 
        var data = $('#student-add-form :input').serializeArray();
        var submitObj = {};
        data.forEach(item => {
            submitObj[item.name] = item.value
        })
        createForm.trigger('reset');
        createStudent(submitObj);
    });

    updateForm.on('submit', e => { 
        e.preventDefault(); 
        var data = $('#student-update-form :input').serializeArray();
        var submitObj = {};
        var id = null;
        data.forEach(item => {

            if (item.name !== 'id')
                submitObj[item.name] = item.value
            else
                id = item.value;
        })
        updateStudent(id,submitObj);
        $('#student-update-form').hide();

    });

    $('#student-update-form button[type=button]').click( () => updateForm.slideUp());

    $('#display').on('click', '.config span', function(e) {
        
        var obj = $(this).data();
        if (obj.method === 'delete'){
            if (confirm('Do you want to delete this student?')){

                if (updateForm.find('#id').val() === obj.studentId)
                    updateForm.hide();

                deleteStudent(obj.studentId);
            }
               
        }
        else{

            var studentRecord = $(`tr#${obj.studentId}`);
            updateForm.find('#id').val(obj.studentId);
            updateForm.find('#up-name').val(studentRecord.find('td[data-type=name]').text());
            updateForm.find('#up-gender').val(studentRecord.find('td[data-type=gender]').text());
            updateForm.find('#up-age').val(studentRecord.find('td[data-type=age]').text());
            updateForm.slideDown();
        }

    });

    updateForm.hide();

    listStudent();



});