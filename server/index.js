// Import dependencies
const express = require("express")
const app = express()
const mysql = require("mysql")

// Creates a MySQL connection pool using the mysql library.
//
// The pool is configured with the following settings:
//   - host: The hostname of the database server.
//   - port: The port number to use for the database connection.
//   - user: The username to authenticate with the database server.
//   - password: The password to use for the authentication.
//   - database: The name of the database to use.
const db = mysql.createPool({
  host: "127.0.0.1",
  port: '33061',
  user: "root",
  password: "ultra_secure_password",
  database: "ChallengeDB",
})

app.get("/", (req, res) => {
  // DB Query
  const sqlInsertItem = "INSERT INTO store_products (nome, descricao, preco, data_criacao) VALUES ('Chanel Bag', 'A very expensive leather bag.', 1250.00, '2023-04-28');"
  db.query(sqlInsertItem, (err, result) => {
    res.send(result)
  })
})

app.listen(3001, ()=>{
  console.log("Server running on port 3001.")
})