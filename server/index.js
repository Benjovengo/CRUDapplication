// Import dependencies
const express = require("express")
const app = express()
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")

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

// CORS module to enable communication between the front-end and back-end servers
app.use(cors())
// grab the information as a JSON object from the front-end
app.use(express.json())
// Body Parser
app.use(bodyParser.urlencoded({extended: true}))

// Handle an HTTP POST request to insert information into the database
// req: represents the request data received from the front-end
// res: represents the response data to be sent back to the front-end
app.post("/api/insert", (req, res) =>{
  // Extract the fields from the request body sent by the front-end
  const productName = req.body.productName // limit: 200 chars
  const productDescription = req.body.productDescription // limit: 500 chars
  const productPrice = req.body.productPrice // limit: decimal(10,2)
  const creationDate = req.body.creationDate // should be in YYYY-MM-DD format
  const updateDate = req.body.updateDate // should be in YYYY-MM-DD format

  // Prepare an SQL INSERT statement with placeholders for the fields
  const sqlInsertStatement = "INSERT INTO store_products (nome, descricao, preco, data_criacao, data_atualizacao) VALUES (?, ?, ?, ?, ?);"
  // Execute the INSERT statement with the extracted field values
  db.query(sqlInsertStatement, [productName, productDescription, productPrice, creationDate, updateDate], (err, result) => {
    // Handle any errors that occurred during the query execution
    console.log(err)
  })
})

app.listen(3001, ()=>{
  console.log("Server running on port 3001.")
})