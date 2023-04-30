import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
// Components for the products and for the sales
import Shopping from '../pages/Shopping'
import Products from '../pages/Products'

const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/products' />} />
      <Route path='/products' element={<Products />} />
      <Route path='/shopping' element={<Shopping />} />
    </Routes>
  )
}

export default Routers
