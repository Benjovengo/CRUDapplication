import React, { useEffect, useState } from "react"
import axios from "axios"

// Stylesheet
import "./App.css"

function App() {

  // Hooks for the product information
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState(0)
  const [productsList, setProductsList] = useState([])

  // Fetch the products from the database when the page loads
  useEffect(() => {
    // Address of the backend server
    const baseURL = "http://localhost:3001"
    const getURL = "/api/get"
    // Send a GET request to the backend server to retrieve product data.
    axios.get(baseURL+getURL).then((response) => {
      setProductsList(response.data)
    })
  }, [])
  

  // Current date in MySQL date format: YYYY-MM-DD
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2); // add leading zero if necessary
    const day = ('0' + today.getDate()).slice(-2); // add leading zero if necessary
    return `${year}-${month}-${day}`;
  }

  const addProduct = (event) => {
    // prevent the form from reloading the page when it's submitted
    event.preventDefault()

    // Send a POST request to the backend server using axios, passing in the form data.
    const baseURL = "http://localhost:3001"
    const insertURL = "/api/insert"
    // Pass in the product name, description, price, creation date, and update date.
    axios.post(baseURL+insertURL, {
      productName: productName,
      productDescription: productDescription,
      productPrice: productPrice,
      creationDate: getCurrentDate(),
      updateDate: getCurrentDate()
    }).then(() => {
      console.log("Product successfully inserted into the database.")
    }).catch(error => {
      console.error("Error inserting product:", error)
    })
  }

  return (
    <div className="App">
      <h1>Insert Product</h1>

      <div className="form__wrapper">
        <form onSubmit={addProduct}>
          <label htmlFor="product-name">Product Name:</label>
          <input type="text" id="product-name" name="product-name" maxLength="200" onChange={(e) => {setProductName(e.target.value)}} required/>

          <label htmlFor="product-description">Product Description:</label>
          <textarea id="product-description" name="product-description" maxLength="500" onChange={(e) => {setProductDescription(e.target.value)}} ></textarea>

          <label htmlFor="price">Price:</label>
          <input type="number" id="price" name="price" step="0.01" min="0" max="9999999.99" onChange={(e) => {setProductPrice(e.target.value)}} required/>

          <button type="submit">Submit</button>
        </form>
      </div>

    </div>
  );
}

export default App;
