import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

export default function App() {
  return (
    // <BrowserRouter>
    <Header />
    // <Routes>
    //   <Route path="/" element={<Home />} exact />
    // </Routes>
    // <Footer />
    /* </BrowserRouter> */
  );
}
