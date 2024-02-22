console.log("hello world!");

import mysql from "mysql2";
import express from "express";
import bodyParser from "body-parser";
// const cors = require("cors");
import cors from "cors";
const app = express();

app.use(cors());

// Parse incoming request bodies
app.use(bodyParser.json());

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

const pool = mysql.createConnection({
  connectionLimit: 10,
  host: "sql6.freesqldatabase.com",
  user: "sql6686064",
  password: "dB6fZzVH5G",
  database: "sql6686064",
});

app.get("/api/data", (req, res) => {
  // Query data from MySQL database
  pool.query("SELECT * FROM story ORDER BY id DESC", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

app.post("/api/data", (req, res) => {
  console.log(req.body.ip);
  const ip = req.body.ip;

  pool.query(
    `INSERT INTO story (content) VALUES ("${ip}")`,
    (error, results) => {
      if (error) {
        console.error("Error inserting content:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({
          message: "Content inserted successfully",
          id: results.insertId,
        });
      }
    }
  );
});

app.get("/", (req, res) => {
  res.send("hello ladiesss!");
});
