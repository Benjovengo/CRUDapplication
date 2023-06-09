import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'
// Import card to display the information of a sale
import SingleSaleCard from '../components/cards/SingleSaleCard'
import productsImage from '../assets/shopping_cart_history.png'

import './Stylesheet.css'

const Shopping = () => {
  // Hooks for the sales information
  const [totalAmount, setTotalAmount] = useState(0)
  const [paymentType, setPaymentType] = useState('')
  const [status, setStatus] = useState('')
  const [salesList, setSalesList] = useState([])
  const [productsList, setProductsList] = useState([])
  const [shoppingItemsList, setShoppingItemsList] = useState([])

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

  // Fetch the products from the database when the page loads
  useEffect(() => {
    // Address of the GET endpoint on the backend server
    const getURL = 'http://localhost:3001/api/get'
    // Send a GET request to the backend server to retrieve product data.
    axios.get(getURL).then((response) => {
      setProductsList(response.data)
    })
  }, [])

  // Create the checkbox list when the products list is updated
  useEffect(() => {
    createProductsCheckboxes()
  }, [productsList])

  // Create the checkbox list when the products list is updated
  useEffect(() => {
    document.getElementById('total-checked').innerText = totalAmount
  }, [totalAmount])

  // Generate a set of checkboxes in an HTML form, one for each object for the
  // products array fetched from the database.
  //
  // When a user selects a checkbox, an alert box is displayed with the
  // respective product name and price.
  const createProductsCheckboxes = () => {
    // Get a reference to the element with ID 'products'
    const productsDiv = document.getElementById('products')
    productsList.forEach(product => {
      // Create a new checkbox element
      const checkbox = document.createElement('input')
      // Set the type and name of the checkbox
      checkbox.type = 'checkbox'
      checkbox.name = 'product'
      // Set the value of the checkbox to the product price
      checkbox.value = product.preco

      // Attach an event listener to the checkbox that displays an alert when it is selected
      checkbox.addEventListener('change', () => {
        const amount = document.getElementById('total-checked').innerText
        if (checkbox.checked) {
          // push item ID to an array
          setShoppingItemsList(shoppingItemsList => [...shoppingItemsList, product.id])
          // add the value of the item to the total amount
          setTotalAmount(Number(amount) + product.preco)
        } else {
          // pop the item ID from the array
          setShoppingItemsList(shoppingItemsList => [...shoppingItemsList].filter((id) => id !== product.id))
          // subtract the value of the item from the total amount
          setTotalAmount(Number(amount) - product.preco)
        }
      })
      // Create the label of the checkbox based on the product name
      const label = document.createElement('label')
      label.innerHTML = product.nome
      // Append the checkbox, label, and a line break to the checkbox list
      productsDiv.appendChild(checkbox)
      productsDiv.appendChild(label)
      productsDiv.appendChild(document.createElement('br'))
    })
  }

  // Current date in MySQL date format: YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2) // add leading zero
    const day = ('0' + today.getDate()).slice(-2) // add leading zero
    return `${year}-${month}-${day}`
  }

  // Return an array of objects containing only the IDs
  // - takes an array of objects with other fields and returns a new array of
  //   objects containing only the id field
  const getIdArray = (productsArray) => {
    const objArr = productsArray.map((num) => {
      return { id: num }
    })
    return objArr
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
      totalPrice: totalAmount,
      creationDate: getCurrentDate(),
      paymentType,
      status,
      productsList: getIdArray(shoppingItemsList)
    })
    // Send a GET request to the backend server to retrieve all the sales.
    const getAllSalesURL = 'http://localhost:3001/api/shopping/get'
    axios.get(getAllSalesURL).then((response) => {
      setSalesList(response.data)
    })
  }

  return (
    <>
      <section>
        <Container fluid>
          <div className='app__wrapper'>

            <Row className='justify-content-center'>
              <Col className='text-center'>
                <h1>Sales Information</h1>
                <p>Information about the sales.</p>
              </Col>
            </Row>
            <Row className='add__items__wrapper align-items-center'>
              <Col className='text-start'>
                <form className='form__wrapper' onSubmit={registerSale}>
                  <div className='form__contents'>
                    <fieldset className='text-start'>
                      <legend>Registered Products</legend>
                      <div className='database__products' id='products' />
                    </fieldset>
                    <Row className='mt-3'>
                      <label htmlFor='total-amount'>Total amount</label>
                      <div>$<span id='total-checked' /></div>
                    </Row>
                    <Row className='mt-2'>
                      <label htmlFor='payment-type'>Payment type</label>
                      <input type='text' id='payment-type' name='payment-type' maxLength='200' onChange={(e) => { setPaymentType(e.target.value) }} required />
                    </Row>
                    <Row className='mt-1'>
                      <label htmlFor='status'>Status:</label>
                      <input type='text' id='status' name='status' maxLength='250' onChange={(e) => { setStatus(e.target.value) }} required />
                    </Row>
                    <Row className='mt-4'>
                      <button type='submit'>Store new sale</button>
                    </Row>
                  </div>
                </form>
              </Col>
              <Col className='text-center'>
                <img className='products__image' src={productsImage} alt='' />
              </Col>
            </Row>

            <Row className='mt-4'>
              <Col>
                <h2>Sales Database</h2>
              </Col>
            </Row>

            <Row>
              <div className='list__database__items'>
                {salesList.map((singleProduct) => (
                  <SingleSaleCard key={singleProduct.id} item={singleProduct} />
                ))}
              </div>
            </Row>

          </div>
        </Container>
      </section>
    </>
  )
}

export default Shopping
