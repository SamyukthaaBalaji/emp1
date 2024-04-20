const router=require("express").Router()
const pool = require("../db");
const authorization=require("../Middleware/authorization")
const nodemailer = require('nodemailer');
require('dotenv').config();
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASS,
    },
});



router.get("/",async(req,res)=>{
    try {

        //req.user has the payload
        res.json(req.user)
        
    } catch (error) {
        console.log(error.message)
        res.status(500).json("server Error")
        
    }
})




router.get("/bday/:employee_id", async (req, res) => {
    try {
        const { employee_id } = req.params;
        const employee = await pool.query(
            'SELECT * FROM employee_det WHERE employee_id = $1',
            [employee_id]
        );
        if (employee.rows.length === 0) {
            return res.status(404).send({ message: "Employee not found" });
        }
        const { full_name, date_of_birth, phone_number, email } = employee.rows[0];
        const today = new Date();
        const empbday = new Date(date_of_birth);
        if (today.getMonth() === empbday.getMonth() && today.getDate() === empbday.getDate()) {
            const mailOptions = {
                from: process.env.EMAIL_ADDRESS,
                to: email,
                subject: 'Happy Birthday!',
                text: `Dear ${full_name},\n\nHappy Birthday! We hope you have a fantastic day.\n\nBest regards,\nYour Team`,
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error("Error sending message", error);
                    res.status(500).json({ message: 'Error sending birthday email', error: error.message });
                } else {
                    console.log('Email sent: ' + info.response);
                    res.status(200).json({ message: 'Birthday email sent successfully' });
                }
            });
        } else {
            res.status(400).json({ message: 'Not the employee\'s birthday' });
        }
    } catch (error) {
        console.error('Error sending birthday email:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

// router.post("/details",(req,res)=>{
//     try {
        

        
//     } catch (error) {
//         console.log(error.message)
        
//     }
// })

// router.get("/alldet",(req,res)=>{
//     try {
        
//     } catch (error) {
//         console.log(error.message)        
//     }
// })

// router.get("/alldet/:id",(req,res)=>{
//     try {
        
//     } catch (error) {
//         console.log(error.message)        
//     }
// })

// router.put("/changedet/id",(req,res)=>{
//     try {
        
//     } catch (error) {
//         console.log(error.message)        
//     }
// })

// router.delete("/changedet/id",(req,res)=>{
//     try {
        
//     } catch (error) {
//         console.log(error.message)        
//     }
// })

module.exports=router;
