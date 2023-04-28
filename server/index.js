const express = require("express")
const app = express()

app.get("/", (req, res) => {
  res.send("Nodemon configured!")
})

app.listen(3001, ()=>{
  console.log("Server running on port 3001.")
})