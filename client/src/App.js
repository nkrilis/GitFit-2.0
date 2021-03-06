import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Exercise from "./pages/Exercise";
import Login from "./pages/Login";
import SingleWorkout from "./pages/SingleWorkout";
import SingleExercise from "./pages/SingleExercise";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Workout from "./pages/Workout";
import CreateWorkout from "./pages/CreateWorkout";
import WorkoutUpdate from "./pages/WorkoutUpdate";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({ addTypename: false }),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div
          id="top"
          className="m-0 p-0 bg-black flex flex-col justify-start min-h-screen"
        >
          <Header />
          <div className="container m-auto">
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/signup" element={<Signup />} exact />
              <Route path="/me" element={<Profile />} exact />
              <Route
                path="/workoutplan/:_id"
                element={<SingleWorkout />}
                exact
              />
              <Route path="/exercise/:_id" element={<SingleExercise />} exact />
              <Route path="/exercise" element={<Exercise />} exact />
              <Route path="/workoutplan" element={<Workout />} exact />
              <Route
                path="/createworkoutplan"
                element={<CreateWorkout />}
                exact
              />
              <Route
                path="/workoutupdate/:id"
                element={<WorkoutUpdate />}
                exact
              />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
