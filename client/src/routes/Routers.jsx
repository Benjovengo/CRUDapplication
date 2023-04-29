import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Shopping from "../pages/Shopping";
import Products from "../pages/Products";
/* import Certificates from "../pages/Certificates";
import Governance from "../pages/Governance";
import Home from "../pages/Home";
//import NftDetails from "../pages/NftDetails";
import Identity from "../pages/Identity"; */


const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/products" />} />
      <Route path="/products" element={<Products />} />
      <Route path="/shopping" element={<Shopping />} />
    </Routes>
  );
};

export default Routers;