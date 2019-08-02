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
- Download the source file and open `cmd` under the file path you store them.
- First, you need to install the node-modules with command `npm i`, it will automatically download the required api modules.
- Then, run with the instruction `node app.js`, then it would automatically open your default browser and go to the site (localhost:9001). - Filling in the form with your student number and two port number for checking the validation. If both the results of the two port numbers are saying ‘port number accepted’, you can click on ‘submit’ button and the browser would alert you that your application is succeed. 
- An e-mail would be sent after a successful submission. 

*You should make sure your computer has **nodejs** environment installed and the port **9001** is free.

## Access data file:
A google spreadsheet created on google drive with private access.
(https://docs.google.com/spreadsheets/d/1zwY5vMOPwoMo27NXJoNshbXAZt_DLz1rvwdnDeV1UuU/edit#gid=0)
