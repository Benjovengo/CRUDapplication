import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import axios from 'axios'

// Stylesheet
import './Cards.css'

const SingleSaleCard = (props) => {
  // Extract all the fields from the argument passed by the map function
  const { id, total, data_criacao, tipo_pagamento, status } = props.item
  // Hooks for the overlay
  const [overlayVisible, setOverlayVisible] = useState(false)
  // Hooks for updating product information
  const [newTotalPrice, setNewTotalPrice] = useState(0)
  const [newPaymentType, setNewPaymentType] = useState('')
  const [newStatus, setNewStatus] = useState('')
  // Hooks for the product names
  const [productNames, setProductNames] = useState([])



  
  



  const displayOverlay = () => {
    setOverlayVisible(true)
    setNewTotalPrice(total)
    setNewPaymentType(tipo_pagamento)
    setNewStatus(status)

    // Address of the GET endpoint on the backend server
    const getURL = `http://localhost:3001/api/shopping/get/${id}`
    // Send a GET request to the backend server to retrieve the products
    // IDs for a particular sale/purchase.
    axios.get(getURL).then((response) => {
      const purchasedIDs = JSON.parse((response.data)[0].product_ids)
      /* console.log(purchasedIDs) */
      for (const productSold of purchasedIDs) {
        // Address of the GET endpoint for the products
        const productURL = `http://localhost:3001/api/get/${productSold.id}`
        axios.get(productURL).then((response) => {
          setProductNames(productNames => [...productNames, (response.data)[0].nome])
        })
      }
    })
  }

  // Deletes a sale information from the database with the provided sale ID, and
  // updates the state of the component with the latest sales data.
  //
  // @param {string} saleID - The ID of the sale to be deleted.
  const deleteSale = (saleID) => {
    // Send a POST request to delete a product from the database
    axios.delete(`http://localhost:3001/api/shopping/delete/${saleID}`)
  }

  // Current date in MySQL date format: YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2) // add leading zero
    const day = ('0' + today.getDate()).slice(-2) // add leading zero
    return `${year}-${month}-${day}`
  }

  // Updates the information of a sale in the database with the provided
  // new information and use the sale ID to differentiate the rows, and
  // updates the state of the component with the latest sales data.
  const updateSaleInfo = () => {
    // Send a POST request to delete a product from the database
    axios.put('http://localhost:3001/api/shopping/update', {
      totalPrice: newTotalPrice,
      creationDate: getCurrentDate(),
      paymentType: newPaymentType,
      status: newStatus,
      saleID: id
    })
    // clear the new hooks
    setNewTotalPrice('')
    setNewPaymentType('')
    setNewStatus('')
    setOverlayVisible(false)
  }

  return (
    <div className='single__product__card'>
      <button onClick={displayOverlay}>
        <Row className='align-items-center'>
          <Col className='col-2 ml-auto text-center product__id'>
            {id}
          </Col>
          <Col>
            <p>Sale Total</p>
            <h4>${total}</h4>
          </Col>
        </Row>
      </button>
      {overlayVisible && (
        <div className='overlay'>
          <div className='overlay__content'>
            <h1>Sale Information</h1>


            <div className="purchase__info">
              <Row>
                <Col>
                  <h4>Purchase Id: {id}</h4>
                </Col>
                <Col>
                <h4>Total: ${total}</h4>
                </Col>
              </Row>

              <h4>Products</h4>
              <div className="scrollable__container">
                {productNames.map((item, index) => (
                  <div key={index}>
                    <Row>
                    </Row>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
              <p className='mt-2'>Insert date: {data_criacao.slice(0, 10)}</p>
            </div>

            <div className='overlay__update__inputs mt-2'>
              <Row>
                <label htmlFor='new-total'>New total amount:</label>
                <input id='new-total' name='new-total' type='number' step='0.01' min='0' max='9999999.99' defaultValue={total} onChange={(e) => { setNewTotalPrice(e.target.value) }} required />
              </Row>
              <Row className='mt-3'>
                <label htmlFor='new-payment-type'>Payment type:</label>
                <input type='text' id='new-payment-type' name='new-payment-type' maxLength='200' defaultValue={tipo_pagamento} onChange={(e) => { setNewPaymentType(e.target.value) }} required />
              </Row>
              <Row className='mt-3 mb-3'>
                <label htmlFor='new-status'>Status:</label>
                <input type='text' id='new-status' name='new-status' maxLength='250' defaultValue={status} onChange={(e) => { setNewStatus(e.target.value) }} required />
              </Row>
              <Row>
                <Col>
                  <button className='delete__button' onClick={() => { deleteSale(id) }}>Delete Item</button>
                </Col>
                <Col>
                  <button className='update__button' onClick={() => { updateSaleInfo(id) }}>Update Item</button>
                </Col>
              </Row>
              <button className='close__button' onClick={() => { setOverlayVisible(false) }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleSaleCard
