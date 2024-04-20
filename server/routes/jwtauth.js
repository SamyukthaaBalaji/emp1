const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

const jwtGenerator = require("../utils/jwtgenerator");
const validationinfo = require("../Middleware/validation_info");
const authorization = require("../Middleware/authorization");
const verifyToken = require("../Middleware/verify");

router.post("/register", validationinfo, async (req, res) => {
  try {
    const { name, email, password, is_admin } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send("Name, email, and password are required");
    }

    
    const user = await pool.query(
      "SELECT * FROM employee WHERE user_email=$1",
      [email]
    );
    if (user.rows.length !== 0) {
      return res.send({ status: false, message: "User already exists" });
    }
    const isAdmin = is_admin === true;

    
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

   
    const newUser = await pool.query(
      "INSERT INTO employee(user_name, user_email, user_password,is_admin) VALUES($1, $2, $3,$4) RETURNING *",
      [name, email, hashedPassword, is_admin]
    );

    res.json({ status: true, message: "registered succesfully" });

    //generatetoken
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

//login route

router.post("/login", validationinfo, async (req, res) => {
  try {
    
    const { email, password } = req.body;

    
    const user = await pool.query(
      "SELECT * FROM employee WHERE user_email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).send("password or email is inorrect");
    }

    
    const validpassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );
    console.log(validpassword);
    //4) jwt generator

    const token = jwtGenerator(user.rows[0].user_id);
    // res.json({ token });
    if (user.rows[0].is_admin) {
      
      res.json({ token, isAdmin: true });
    } else {
      
      res.json({ token });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/profile", verifyToken, async (req, res) => {
  const id = req.userId;
  const profile = await pool.query("SELECT * FROM employee WHERE user_id=$1 ", [
    id,
  ]);
  res.json(profile.rows[0]);
});

module.exports = router;
