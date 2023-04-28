const express = require("express")
const app = express()
const mysql = require("mysql")

// call the database
const db = mysql.createPool({
  host: "127.0.0.1",
  port: '33061',
  user: "root",
  password: "ultra_secure_password",
  database: "ChallengeDB",
})

app.get("/", (req, res) => {
  // DB Query
  const sqlInsertItem = "INSERT INTO store_products (product_name, description, price, quantity) VALUES ('Chanel Bag', 'A very expensive leather bag.', 1250.00, 1);"
  db.query(sqlInsertItem, (err, result) => {
    res.send(result)
  })
})

app.listen(3001, ()=>{
  console.log("Server running on port 3001.")
})