const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
 return res.send('pong');
});
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(port);

app.use(bodyParser.urlencoded({ extended: true })); 

// POST route from contact form
app.post('/contact', function (req, res) {
  let mailOpts, smtpTrans;
  smtpTrans = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'matthewraymondweinert@gmail.com',
      pass: 'alfmqumypnkhhfiu'
    }
  });
  mailOpts = {
    from: req.body.name + ' &lt;' + req.body.email + '&gt;',
    to: 'matthewraymondweinert@gmail.com',
    subject: 'New message from Mattweinert.com',
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
    if (error) {
    }
    else {
      res.redirect('/contact');
    }
  });
});