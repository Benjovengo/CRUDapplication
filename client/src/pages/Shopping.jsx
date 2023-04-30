import React, { useEffect, useState } from 'react'
import axios from 'axios'

import SingleSaleCard from '../components/cards/SingleSaleCard'

import './Stylesheet.css'


const Shopping = () => {
  // Hooks for the sales information
  const [totalPrice, setTotalPrice] = useState(0)
  const [paymentType, setPaymentType] = useState('')
  const [status, setStatus] = useState('')
  const [salesList, setSalesList] = useState([])


  // Fetch the sales data from the database when the page loads or the sales
  // list changes
  useEffect(() => {
    // Address of the backend server
    const getAllSalesURL = 'http://localhost:3001/api/shopping/get'
    // Send a GET request to the backend server to retrieve product data.
    axios.get(getAllSalesURL).then((response) => {
      setSalesList(response.data)
    })
  }, [salesList])


  // Current date in MySQL date format: YYYY-MM-DD
  function getCurrentDate () {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2) // add leading zero
    const day = ('0' + today.getDate()).slice(-2) // add leading zero
    return `${year}-${month}-${day}`
  }

  // Register a new sale.
  // Send a POST request to the backend server using axios to register the new
  // sale, and then send a GET request to retrieve all the sales and update the
  // sales list in the front-end.
  const registerSale = (event) => {
    // Prevent the form from reloading the page when it's submitted
    event.preventDefault()
    // Send a POST request to the backend server using axios, passing in the
    // form data.
    const registerSaleURL = 'http://localhost:3001/api/shopping/insert'
    // Pass in the product name, description, price, creation date, and update
    // date.
    axios.post(registerSaleURL, {
      totalPrice: totalPrice,
      creationDate: getCurrentDate(),
      paymentType: paymentType,
      status: status
    })
    // Send a GET request to the backend server to retrieve all the sales.
    const getAllSalesURL = 'http://localhost:3001/api/shopping/get'
    axios.get(getAllSalesURL).then((response) => {
      setSalesList(response.data)
    })
  }


  return (
    <div className='App'>
      <h1>Shopping History</h1>

      <div className='form__wrapper'>
        <form onSubmit={registerSale}>
          <label htmlFor='total-amount'>Total amount:</label>
          <input type='number' id='total-amount' name='total-amount' step='0.01' min='0' max='9999999.99' onChange={(e) => { setTotalPrice(e.target.value) }} required />
          <label htmlFor='payment-type'>Payment type:</label>
          <input type='text' id='payment-type' name='payment-type' maxLength='200' onChange={(e) => { setPaymentType(e.target.value) }} required />
          <label htmlFor='status'>Status:</label>
          <input type='text' id='status' name='status' maxLength='250' onChange={(e) => { setStatus(e.target.value) }} required />
          <button type='submit'>Submit</button>
        </form>
      </div>

      {salesList.map((singleProduct) => (
          <SingleSaleCard key={singleProduct.id} item={singleProduct} />
        )
      )}
    </div>
  )
}

export default Shopping