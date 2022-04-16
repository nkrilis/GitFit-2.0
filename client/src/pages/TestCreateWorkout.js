import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { CREATE_WORKOUT_PLAN } from "../utils/mutations";

import Auth from "../utils/auth";
import decode from "jwt-decode";

const TestCreateWorkout = () => {
  const [createWorkoutPlan] = useMutation(CREATE_WORKOUT_PLAN);

  // function to create workout plan in database
  const createWorkout = async () => {
    console.log(planDetails);
    await createWorkoutPlan({
      variables: {
        id: "55",
        title: planDetails.title,
        description: planDetails.description,
        type: planDetails.type,
        numOfWeeks: parseInt(planDetails.numOfWeeks),
        plan: [],
      },
    });
    //add in function to set state back to starting text
  };

  const decoded = decode(localStorage.getItem("id_token"));

  const [planDetails, setPlanDetails] = useState({
    title: "Name here",
    description: "Description here",
    type: "Type here",
    numOfWeeks: 1,
    plan: "",
    numOfDays: 1,
  });

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  //Updating state to have input user data
  const updateTitle = (val) => {
    setPlanDetails({
      ...planDetails,
      title: val,
    });
  };

  const updateType = (val) => {
    setPlanDetails({
      ...planDetails,
      type: val,
    });
  };

  const updateDescription = (val) => {
    setPlanDetails({
      ...planDetails,
      description: val,
    });
  };

  const updateWeeks = (val) => {
    setPlanDetails({
      ...planDetails,
      numOfWeeks: val,
    });
  };

  const updateDays = (val) => {
    setPlanDetails({
      ...planDetails,
      numOfDays: val,
    });
  };

  return (
    <div>
      <Link to="/">
        <div className="text-white">My created workout plans</div>
      </Link>
      <br></br>

      <form className="bg-purple-100 shadow-md px-2 py-2">
        <div className="grid grid-cols-4 gap-2">
          <label htmlFor="name">Workout plan name:</label>
          <input
            className="w-full"
            type="text"
            placeholder={planDetails.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
          <label htmlFor="type">Workout type:</label>
          <input
            type="text"
            placeholder={planDetails.type}
            onChange={(e) => updateType(e.target.value)}
          />
          <label htmlFor="description">Workout description:</label>
          <textarea
            className="col-span-3"
            type="text"
            placeholder={planDetails.description}
            onChange={(e) => updateDescription(e.target.value)}
          />
          <label htmlFor="numOfWeeks">Number of weeks:</label>
          <input
            type="number"
            min="1"
            max="52"
            placeholder={planDetails.numOfWeeks}
            onChange={(e) => updateWeeks(e.target.value)}
          />
          <label htmlFor="days">Number of workout days each week:</label>
          <input
            type="number"
            min="1"
            max="7"
            placeholder={planDetails.numOfDays}
            onChange={(e) => updateDays(e.target.value)}
          />
        </div>
        <br></br>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={createWorkout}
        >
          Add exercises
        </button>
      </form>
    </div>
  );
};

export default TestCreateWorkout;
