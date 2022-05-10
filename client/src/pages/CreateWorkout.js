import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { CREATE_WORKOUT_PLAN } from "../utils/mutations";

import Auth from "../utils/auth";
import decode from "jwt-decode";

const CreateWorkout = () => {
  const [createWorkoutPlan] = useMutation(CREATE_WORKOUT_PLAN);

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
  const decoded = decode(localStorage.getItem("id_token"));

  // function to create workout plan in database
  const createWorkout = async () => {
    let weeksArr = [];

    for (let i = 0; i < parseInt(planDetails.numOfWeeks); i++) {
      weeksArr.push({
        weekNumber: i + 1,
        days: [
          {
            dayOfWeek: "Monday",
            exercises: [{ exerciseId: "1", userSets: 1, userReps: 1 }],
          },
        ],
      });
    }

    await createWorkoutPlan({
      variables: {
        id: workoutId,
        ownerId: decoded.data._id,
        title: planDetails.title,
        description: planDetails.description,
        type: planDetails.type,
        numOfWeeks: parseInt(planDetails.numOfWeeks),
        plan: [
          {
            weeks: weeksArr,
          },
        ],
      },
    });
  };

  //temporary to generate random ID for workout beingt created until set up in mongoDB
  const generateId = () => {
    return (
      Math.floor((1 + Math.random()) * 0x10000).toString(16) +
      Math.floor((1 + Math.random()) * 0x10000).toString(36)
    );
  };

  let workoutId = generateId();

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

  return (
    <div className="container">
      <form className="bg-purple-100 shadow-md px-2 py-2">
        <div className="block lg:grid lg:grid-cols-6 gap-2">
          <label htmlFor="name">Workout plan name:</label>
          <input
            className="w-full col-span-2"
            type="text"
            placeholder={planDetails.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
          <label htmlFor="type">Workout type:</label>
          <input
            className="w-full col-span-2"
            type="text"
            placeholder={planDetails.type}
            onChange={(e) => updateType(e.target.value)}
          />
          <label htmlFor="description">Workout description:</label>
          <textarea
            className="w-full col-span-5"
            type="text"
            placeholder={planDetails.description}
            onChange={(e) => updateDescription(e.target.value)}
          />
          <label htmlFor="numOfWeeks">Number of weeks:</label>
          <input
            className="w-full"
            type="number"
            min="1"
            max="52"
            placeholder={planDetails.numOfWeeks}
            onChange={(e) => updateWeeks(e.target.value)}
          />
        </div>
        <br></br>
        <Link to={{ pathname: `/workoutupdate/${workoutId}` }}>
          <div
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
            type="button"
            onClick={createWorkout}
          >
            Create workout plan
          </div>
        </Link>
      </form>
    </div>
  );
};

export default CreateWorkout;
