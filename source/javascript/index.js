$("#port1").blur(function() {
    var p1 = $('#port1').val();
    if (p1 >= 61000 && p1 <= 61999) {
        $.ajax({
            type: "post",
            url: "http://localhost:9001/",
            data: { port: p1 },
            success: (data) => {
                if (data == "notExist") {
                    $('#port1_rslt').text("Port number ACCEPTED");
                } else {
                    $('#port1_rslt').text("Port number BLOCKED");
                }
            }
        });
    } else {
        $('#port1_rslt').text('the number is out of range');
    }
})


$("#port2").blur(function() {
    var p2 = $('#port2').val();
    if (p2 >= 61000 && p2 <= 61999) {
        $.ajax({
            type: "post",
            url: "http://localhost:9001/",
            data: { port: p2 },
            success: (data) => {
                if (data == "notExist") {
                    $('#port2_rslt').text("Port number ACCEPTED");
                } else {
                    $('#port2_rslt').text("Port number BLOCKED");
                }
            }
        });
    } else {
        $('#port2_rslt').text('the number is out of range');
    }
})


$('#submit').click(function() {

    var id = $('#studentID').val(),
        p1 = $('#port1').val(),
        p2 = $('#port2').val(),
        p1_rslt = $('#port1_rslt').val(),
        p2_rslt = $('#port2_rslt').val();

    if (p1_rslt.indexOf('ACCEPTED') != -1 && p2_rslt.indexOf('ACCEPTED') != -1 && id != '' && p1 != p2) {
        $.ajax({
            type: "post",
            url: "http://localhost:9001/",
            data: { sid: id, potr1: p1, port2: p2 },
            success: (data) => {
                // TODO : write to googlesheet and shend email
            }
        });
        alert("Successfully submitted and emailed.");
    } else if (id == '') {
        alert("Please enter your student number.");
    } else if (p1 == p2) {
        alert("The two port number must be different.");
    } else {
        alert("Fail to submit, please check the port numbers again.");
    }

})