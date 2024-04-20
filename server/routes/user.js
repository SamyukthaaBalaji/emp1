const router = require("express").Router();
const pool = require("../db");
router.post("/empdet", async (req, res) => {
  try {
    const { user_id, full_name, date_of_birth, gender, address, phone_number } =
      req.body;

    const employeeResult = await pool.query(
      "SELECT * FROM employee WHERE user_id = $1",
      [user_id]
    );

    if (employeeResult.rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    const insertQuery = await pool.query(
      `INSERT INTO employee_det (user_id, full_name, date_of_birth, gender, address, phone_number)
                                              VALUES ($1, $2, $3, $4, $5, $6)
                                              RETURNING *`,
      [user_id, full_name, date_of_birth, gender, address, phone_number]
    );

    // res.json(insertQuery.rows[0]);
    res.json({ message: "Registered successfully" });
  } catch (err) {
    console.error("Error executing query", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/getemp", async (req, res) => {
  try {
    const det = await pool.query("SELECT * FROM employee_det");
    res.json(det.rows);
  } catch (error) {
    console.log(error.message);
  }
});
router.delete("/delemp/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params;
    const delemp = await pool.query(
      "DELETE FROM employee_det WHERE  employee_id=$1",
      [employee_id]
    );
    res.json("a row was deleted");
  } catch (error) {
    console.log(error.message);
  }
});
router.get("/empdet/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params;
    console.log(employee_id);
    const empid = await pool.query(
      "SELECT * FROM employee_det WHERE user_id=$1",
      [employee_id]
    );
    res.json(empid.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});
router.put("/updateemp/:employee_id", async (req, res) => {
  try {
    const { employee_id } = req.params;
    const { full_name, date_of_birth, gender, address, phone_number } =
      req.body;
    const update = await pool.query(
      "UPDATE employee_det SET full_name=$1, date_of_birth=$2, gender=$3, address=$4, phone_number=$5 WHERE employee_id=$6 RETURNING *",
      [full_name, date_of_birth, gender, address, phone_number, employee_id]
    );
    console.log(update);
    res.json(update.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
