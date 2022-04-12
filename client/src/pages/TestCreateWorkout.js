import React from "react";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../utils/queries";

const TestCreateWorkout = () => {
  const { loading, data } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });

  const exerciseList = data?.getExercises || [];

  return (
    <div className="container">
      <form className="bg-purple-100 shadow-md px-2 py-2">
        <div className="grid grid-cols-4 gap-2">
          <label htmlFor="name">Workout plan name:</label>
          <input className="w-full" id="name" type="text" placeholder="" />
          <label htmlFor="type">Workout type:</label>
          <input id="type" type="text" placeholder="" />
          <label htmlFor="description">Workout description:</label>
          <textarea
            className="col-span-3"
            id="description"
            type="text"
            placeholder=""
          />
          <label htmlFor="numOfWeeks">Number of weeks:</label>
          <input id="numOfWeeks" type="number" placeholder="1" />
          <label htmlFor="days">Number of workout days each week:</label>
          <input id="days" type="number" placeholder="1" />
        </div>
      </form>
    </div>
  );
};

export default TestCreateWorkout;
