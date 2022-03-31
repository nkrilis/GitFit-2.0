import React, { useState, useEffect } from "react";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Workout from "./pages/Workout";
import Exercise from "./pages/Exercise";


const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/signup" element={<Signup />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/workout" element={<Workout />} exact />
        {/* <Route path="/exercise" element={<Exercise />} exact /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
    </ApolloProvider>
  );
}
