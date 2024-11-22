const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 5000;

// Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//database conection with mongodb
mongoose.connect("mongodb+srv://blackjack2:DDQ3FtuRCSsvNIXh@cluster0.kp3yv.mongodb.net/e-commerce");

//API creation

app.get("/",(req,res)=>{
    res.send("express app is running")
})

//image storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})




app.listen(PORT,(error)=>{
    if(!error){
        console.log("server running on port"+ PORT)
    }
    else{
        console.log("error: "+error)
    }
})

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'amaanansarii2002@gmail.com',  // Replace with your Gmail address
        pass: 'kfym xyjd kjjg gial'  // Replace with the App Password generated from Google
    }
});

// Route to handle newsletter signup
app.post('/signup', (req, res) => {
    const { email } = req.body;

    // Email content
    const mailOptions = {
        from: 'amaanansarii2002@gmail.com', // Sender address
        to: email, // List of recipients
        subject: 'Newsletter Signup Confirmation',
        text: 'Thank you for subscribing to our newsletter!'
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send newsletter signup email.');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Newsletter signup email sent successfully.');
        }
    });
});

