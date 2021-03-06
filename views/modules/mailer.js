// Mailserver
var nodemailer = require("nodemailer")
, fs = require('fs');
// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: fs.readFileSync('/home/ubuntu/keys/mail.id'),
        pass: fs.readFileSync('/home/ubuntu/keys/mail.key')
    }
});


function sendConfirmation(to) {

var mailOptions = {
    from: "Pilot+ <mail@pilot.plus>",
    to: to,
    subject: "Confirm your Account",
    text: "Please visit this address to confirm your account with us: http://pilot.plus/confirm/"+confirm,
    html: "<b>Pilot+"
}
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});


}