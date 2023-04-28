import React, { useEffect, useState } from "react"
import Axios from "axios"

// Stylesheet
import "./App.css"

function App() {

  // Hooks for the product information
  const [productName, setProductName] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState(0)


  const addProduct = (event) => {
    // prevent the form from reloading the page when it's submitted
    event.preventDefault()
    // POST request from Axios - sending information into the backend
    
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
