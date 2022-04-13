import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../utils/queries";

const TestCreateWorkout = () => {
  //   const { loading, data } = useQuery(GET_EXERCISES, {
  //     fetchPolicy: "no-cache",
  //   });

  //   const exerciseList = data?.getExercises || [];

  const [planDetails, setPlanDetails] = useState({
    title: "Name here",
    description: "Description here",
    type: "Type here",
    numOfWeeks: 1,
    plan: "",
    days: 1,
  });

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
      days: val,
    });
  };

  return (
    <div>
      <Link to="/">
        <div className="text-white">My created workout plans</div>
      </Link>
      <br></br>
      <div className="container">
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
              placeholder={planDetails.numOfWeeks}
              onChange={(e) => updateWeeks(e.target.value)}
            />
            <label htmlFor="days">Number of workout days each week:</label>
            <input
              type="number"
              placeholder={planDetails.days}
              onChange={(e) => updateDays(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestCreateWorkout;
