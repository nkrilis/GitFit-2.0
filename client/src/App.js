import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Workout from "./pages/Workout";
import Exercise from "./pages/Exercise";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/workout" element={<Workout />} exact />
        <Route path="/exercise" element={<Exercise />} exact />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
