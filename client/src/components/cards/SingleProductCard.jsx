import React, { useState } from 'react'

// Stylesheet
import './Cards.css'

const SingleProductCard = (props) => {

  const {id, nome, descricao, preco, data_criacao, data_atualizacao} = props.item

  return (
    <div className="single__product__card">
      <p>Product Name</p>
      <h2>{nome}</h2>
      <p>ID: {id}</p>
      <p>Product name: {nome}</p>
      <p>Product description: {descricao}</p>
      <p>Price: {preco}</p>
      <p>Insert date: {data_criacao}</p>
      <p>Update date: {data_atualizacao}</p>
    </div>
  )
}

export default SingleProductCard