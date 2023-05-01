import React, { useState } from 'react'
import { Row, Col } from 'reactstrap'
import axios from 'axios'

// Stylesheet
import './Cards.css'

const SingleProductCard = (props) => {
  // Extract all the fields from the argument passed by the map function
  const { id, nome, descricao, preco, data_criacao, data_atualizacao } = props.item
  // Hooks for the overlay
  const [overlayVisible, setOverlayVisible] = useState(false)
  // Hooks for updating product information
  const [newProductName, setNewProductName] = useState('')
  const [newProductDescription, setNewProductDescription] = useState('')
  const [newProductPrice, setNewProductPrice] = useState(0)

  const displayOverlay = () => {
    setOverlayVisible(true)
    setNewProductName(nome)
    setNewProductDescription(descricao)
    setNewProductPrice(preco)
  }

  // Deletes a product from the database with the provided product ID, and
  // updates the state of the component with the latest product data.
  //
  // @param {string} productID - The ID of the product to be deleted.
  const deleteProduct = (productID) => {
    // Send a POST request to delete a product from the database
    axios.delete(`http://localhost:3001/api/delete/${productID}`)
  }

  // Current date in MySQL date format: YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = ('0' + (today.getMonth() + 1)).slice(-2) // add leading zero
    const day = ('0' + today.getDate()).slice(-2) // add leading zero
    return `${year}-${month}-${day}`
  }

  // Updates the information of a product in the database with the provided
  // new information and usee the product ID to differentiate the rows, and
  // updates the state of the component with the latest product data.
  //
  // @param {int} productID - The ID of the product to be deleted.
  const updateProduct = (productID) => {
    // Send a POST request to delete a product from the database
    axios.put('http://localhost:3001/api/update/', {
      productID,
      productName: newProductName,
      productDescription: newProductDescription,
      productPrice: newProductPrice,
      updateDate: getCurrentDate()
    })
    // clear the new hooks
    setNewProductName('')
    setNewProductDescription('')
    setNewProductPrice('')
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
            <p>Product Name</p>
            <h4>{nome}</h4>
          </Col>
        </Row>
      </button>
      {overlayVisible && (
        <div className='overlay'>
          <div className='overlay__content'>
            <h1>Product Information</h1>
            <div className='overlay__update__inputs'>
              <Row>
                <label htmlFor='product-new-name'>Product Name</label>
                <input id='product-new-name' name='product-new-name' type='text' defaultValue={nome} onChange={(e) => { setNewProductName(e.target.value) }} required />
              </Row>
              <Row className='mt-3'>
                <label htmlFor='product-new-description'>Product Description</label>
                <textarea id='product-new-description' name='product-new-description' maxLength='500' defaultValue={descricao} onChange={(e) => { setNewProductDescription(e.target.value) }} />
              </Row>
              <Row className='mt-3'>
                <label htmlFor='new-price'>Price</label>
                <input id='new-price' name='new-price' type='number' step='0.01' min='0' max='9999999.99' defaultValue={preco} onChange={(e) => { setNewProductPrice(e.target.value) }} required />
              </Row>
              <Row>
                <p className='mt-4'>Insert date: {data_criacao.slice(0, 10)}</p>
                <p className='mb-4'>Update date: {data_atualizacao.slice(0, 10)}</p>
              </Row>
              <Row>
                <Col>
                  <button className='delete__button' onClick={() => { deleteProduct(id) }}>Delete Item</button>
                </Col>
                <Col>
                  <button className='update__button' onClick={() => { updateProduct(id) }}>Update Item</button>
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

export default SingleProductCard
