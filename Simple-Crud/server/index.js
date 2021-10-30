const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Qwe@123qwe",
  database: "employee_system",
});

app.post("/create", (request, response) => {
  console.log("request bode ==>> ", request.body);
  const name = request.body.name;
  const age = request.body.age;
  const country = request.body.country;
  const position = request.body.position;
  const wage = request.body.wage;

  db.query(
    "INSERT INTO employee_data (name, age, country, position, wage) VALUES(?,?,?,?,?)",
    [name, age, country, position, wage],
    (error, result) => {
      if (error) {
        console.log("error ==>> ", error);
      } else {
        response.send("Values Inserted");
      }
    }
  );
});

app.get("/employeeList", (request, response) => {
  db.query("SELECT * FROM employee_data", (error, result) => {
    if (error) {
      console.log("error ==>> ", error);
    } else {
      response.send(result);
    }
  });
});

app.put("/updateEmployeeList", (request, response) => {
  const id = request.body.id;
  const wage = request.body.wage;
  console.log("wage ==>> ", wage);
  console.log("id ==>> ", id);
  db.query(
    "UPDATE employee_data SET wage = ? WHERE id = ?",
    [wage, id],
    (error, result) => {
      if (error) {
        console.log("error ==>> ", error);
      } else {
        response.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (request, response) => {
  const id = request.params.id;
  db.query("DELETE FROM employee_data WHERE id = ?", id, (error, result) => {
    if (error) {
      console.log("error ==>> ",error);
    } else {
      response.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
