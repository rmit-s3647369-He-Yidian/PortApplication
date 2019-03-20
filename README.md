# PortApplication
This is a simple application which you can select two accepted port numbers to submit. The successful submission would automatically send an email with the information of your ID along with the two numbers. The application utilizes a google spreadsheet as a database, all accepted numbers and their corresponding ID would also automatically be written into the sheet.

## Dependencies:
nodejs

google-spreadsheet api

nodemailer api

## Code files:
./app.js

./source

## Execution:
Open your command line, input the instruction `node app.js`, then it would automatically open your default browser and go to the site (localhost:9001). Filling in the form with your student number and two port number for checking the validation. If both the results of the two port numbers are saying ‘port number accepted’, you can click on ‘submit’ button and the browser would alert you that your application is succeed. An e-mail would be sent after the successful submit. 

**You should make sure your computer has node js environment installed and the port 9001 is free.

## Access data file:
A google spreadsheet created on google drive with private access.
(https://docs.google.com/spreadsheets/d/1zwY5vMOPwoMo27NXJoNshbXAZt_DLz1rvwdnDeV1UuU/edit#gid=0)
