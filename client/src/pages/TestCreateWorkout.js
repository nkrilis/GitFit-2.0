import React, { useState } from "react";
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
    numOfWeeks: "1",
    plan: "",
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

  return (
    <div className="container">
      <form className="bg-purple-100 shadow-md px-2 py-2">
        <div className="grid grid-cols-4 gap-2">
          <label htmlFor="name">Workout plan name:</label>
          <input
            className="w-full"
            id="name"
            type="text"
            placeholder={planDetails.title}
            onChange={(e) => updateTitle(e.target.value)}
          />
          <label htmlFor="type">Workout type:</label>
          <input
            id="type"
            type="text"
            placeholder={planDetails.type}
            onChange={(e) => updateType(e.target.value)}
          />
          <label htmlFor="description">Workout description:</label>
          <textarea
            className="col-span-3"
            id="description"
            type="text"
            placeholder={planDetails.description}
            onChange={(e) => updateDescription(e.target.value)}
          />
          <label htmlFor="numOfWeeks">Number of weeks:</label>
          <input
            id="numOfWeeks"
            type="number"
            placeholder={planDetails.numOfWeeks}
            onChange={(e) => updateWeeks(e.target.value)}
          />
          {/* <label htmlFor="days">Number of workout days each week:</label>
          <input id="days" type="number" placeholder="1" /> */}
        </div>
      </form>
    </div>
  );
};

export default TestCreateWorkout;
