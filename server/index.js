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

  })
})

app.listen(3001, ()=>{
  console.log("Server running on port 3001.")
})