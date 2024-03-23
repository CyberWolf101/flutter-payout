
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = express.Router()
app.use(bodyParser.json());
const PORT = 4000
app.use(cors());
// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use the email service provider you prefer
  auth: {
    user: 'Oshofree.help@gmail.com',
    pass: 'usqh ipjh jpfk xwts',
  },
});



router.post('/send-email', (req, res) => {
  const { to, subject, text, heading } = req.body;
  console.log(to, subject, text, heading)
  const emailContent = `
  <html>
    <head>
      <style>
        /* Your CSS styles here */
        body {
          font-family: Arial, sans-serif;
          background-color: #f2f2f2;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <center><h4> ${heading}</h4></center>
       
      <center>
      <p style="font-size: 13px;">${text}</p>
      </center>
       
      </div>
    </body>
  </html>
`;


  const mailOptions = {
    from: 'Oshofree',
    to,
    subject,
    text,
    html: emailContent,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});


app.use(router)