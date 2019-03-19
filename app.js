const GoogleSpreadsheet = require('google-spreadsheet');
var creds = require('./json/credentials.json');
// create a document object using the ID of the spreadsheet - obtained from its URL.
var doc = new GoogleSpreadsheet('1zwY5vMOPwoMo27NXJoNshbXAZt_DLz1rvwdnDeV1UuU');
// require api to send mail
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'honedot@gmail.com', pass: '082504hyd' } });

var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");

/**
 * make source file static and ready to use
 */
app.use(express.static(path.join(__dirname, "source")));


/**
 * load the index page on local host
 * listen to port 9001
 * 
 */
app.get("/", function(req, res) {
    fs.readFile('./source/index.html', 'utf-8', function(err, data) {
        if (err)
            throw err;
        res.end(data); // load index.html
    });
}).listen(9001, "localhost", function(err) {
    if (!err) {
        console.log("server is running on port 9001...");
    }
});


/**
 * get post data and give response
 * 
 */
app.post('/', function(req, res) {
    // set http header
    res.setHeader("Access-Control-Allow-Origin", "*");
//    if (req.method == "POST") { // do post        
        var result = "";
        // get port number
        req.addListener("data", function(chunk) {
            result += chunk;
        });
        // do checking or submitting and respond with result
        req.on("end", function() {
            doc.useServiceAccountAuth(creds, function(err) {
                if (result.toString().indexOf('&') != -1) { // do submitting
                    var toBeAdded = result.split('&');
                    var sid = toBeAdded[0].slice(4),
                        p1 = toBeAdded[1].slice(6),
                        p2 = toBeAdded[2].slice(6);
                    /**
                     * get worksheet 
                     * add new row info into the sheet
                     * send email with context of {sid, p1, p2}
                     * finally end the response
                     */
                    doc.getInfo(function(err, info) {
                        var sheet = info.worksheets[0];
                        // upload new rows into the google spreadsheet
                        doc.addRow(1, { port1: p1, port2: p2, studentid: sid }, function() { if (err) console.log(err) });
                        console.log("new row added");
                        const mailOptions = {
                            from: 'honedot@gmail.com', // sender address
                            to: 's3647369@student.rmit.edu.au', // list of receivers
                            subject: 'Port Number Apply', // Subject line
                            html: '{ ' + sid + ', ' + p1 + ', ' + p2 + ' }' // plain text body
                        };
                        // send email
                        transporter.sendMail(mailOptions, function(err, info) {
                            if (err) console.log(err);
                            else console.log(info);
                        });
                        res.end();
                    });
                } else { // do checking
                    var port = result.toString().slice(5, 10); // refer the port number user input    
                    var array = new Array(); // store all the port number that is in the sheet
                    var num = -1; // refer the result of number checking
                    /**
                     * look for all the ports numbers
                     * if is exit then return true
                     * if is not exit then return false
                     * finally reponse with String message
                     */
                    doc.getRows(1, function(err, rows) {
                        var json = JSON.parse(JSON.stringify(rows, null, 2)); //get json file from the sheet
                        var length = json.length; // number of rows
                        // store all exist port numbers in an array
                        for (var i = 0; i < length; i++) {
                            array.push(json[i].port1);
                            array.push(json[i].port2);
                        }
                        // do comparision and return the num to refer the result
                        for (var j = 0; j < array.length; j++) {
                            if (parseInt(port) == parseInt(array[j])) {
                                num = 1;
                                break;
                            } else {
                                num = 0;
                            }
                        }
                        if (num == 1) res.end("isExist"); // reponse that the number is exist
                        else res.end("notExist"); // reponse that the number is not exist
                    });
                }
            });
        });
//    }
})

// Opens the url in the default browser
const opn = require('opn');
opn('http://localhost:9001');