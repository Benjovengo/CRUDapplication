import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap'
import axios from 'axios'

import SingleProductCard from '../components/cards/SingleProductCard'
import productsImage from '../assets/products_hero.png'

import './Stylesheet.css'

const Products = () => {
  // Hooks for the product information
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState(0)
  const [productsList, setProductsList] = useState([])

  // Fetch the products from the database when the page loads
  useEffect(() => {
    // Address of the GET endpoint on the backend server
    const getRequestURL = 'http://localhost:3001/api/get'
    // Send a GET request to the backend server to retrieve product data.
    axios.get(getRequestURL).then((response) => {
      setProductsList(response.data)
    })
  }, [productsList])

  // Current date in MySQL date format: YYYY-MM-DD
  function getCurrentDate () {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2) // add leading zero
    const day = ('0' + today.getDate()).slice(-2) // add leading zero
    return `${year}-${month}-${day}`
  }

  // Add a new product record to the database
  //
  // This function sends a POST request to the server-side to store a new
  // product in the database using Axios library in JavaScript. After adding
  // a new product, a GET request is emitted to retrieve the updated list of
  // products stored in the database.
  //
  // - The postRequestURL and getRequestURL hold the endpoints for the
  //   respective GET and POST requests.
  //
  // In the POST request, the form data is passed to the server including the
  // information about the product.
  // The GET request is used to retrieve data from the server. The response data
  //  can be used as per the requirement of the project.
  const addProduct = (event) => {
    // prevent the form from reloading the page when it's submitted
    event.preventDefault()
    // Endpoint URLs for POST and GET requests
    const postRequestURL = 'http://localhost:3001/api/insert'
    const getRequestURL = 'http://localhost:3001/api/get'
    // Send a POST request to the backend server using axios, passing in the
    // form data including:
    // - productName: the name of the product (limit: 200 chars)
    // - productDescription: the description of the products (limit: 500 chars)
    // - productPrice: the price (limit: 99999999.99)
    // - creationDate: the date of inclusion of the product (format: YYY-MM-DD)
    // - updateDate: date of update (null because it's just included)
    axios.post(postRequestURL, {
      productName,
      productDescription,
      productPrice,
      creationDate: getCurrentDate(),
      updateDate: null
    })
    // Send a GET request to the backend server to retrieve product data.
    axios.get(getRequestURL).then((response) => {
      setProductsList(response.data)
    })
  }

  return (
    <>
      <section>
        <Container fluid>
          <div className='app__wrapper'>

            <Row className='justify-content-center'>
              <Col className='text-center'>
                <h1>Product Information</h1>
                <p>Information about the products.</p>
              </Col>
            </Row>
            <Row className='add__items__wrapper align-items-center'>
              <Col className='text-center'>
                <form className='form__wrapper' onSubmit={addProduct}>
                  <div className='form__contents'>
                    <Row>
                      <label htmlFor='product-name'>Product Name</label>
                      <input type='text' id='product-name' name='product-name' maxLength='200' onChange={(e) => { setProductName(e.target.value) }} required />
                    </Row>
                    <Row>
                      <label className='mt-2' htmlFor='product-description'>Product Description:</label>
                      <textarea id='product-description' name='product-description' maxLength='500' onChange={(e) => { setProductDescription(e.target.value) }} />
                    </Row>
                    <Row className='align-items-end mt-2'>
                      <label htmlFor='price'>Price:</label>
                      <input type='number' id='price' name='price' step='0.01' min='0' max='9999999.99' onChange={(e) => { setProductPrice(e.target.value) }} required />
                    </Row>
                    <Row className='mt-5'>
                      <button type='submit'>Add product</button>
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
                <h2>Stored Products - Database</h2>
              </Col>
            </Row>
            <Row>
              <div className='list__database__items'>
                {productsList.map((singleProduct) => (
                  <SingleProductCard key={singleProduct.id} item={singleProduct} />
                ))}
              </div>
            </Row>
          </div>
        </Container>
      </section>
    </>
  )
}

export default Products
