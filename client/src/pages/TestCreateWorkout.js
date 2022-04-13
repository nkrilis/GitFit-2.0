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
    numOfDays: 1,
  });

  const [isActive, setDisplay] = useState("false");

  const [weeks, setWeeks] = useState([1]);
  const [days, setDays] = useState([1]);

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

  //Switch between display of plan details or exercises
  const toggleDisplay = () => {
    setDisplay(!isActive);
  };

  //Create array to map for weeks and days in workout
  const workoutWeeks = () => {
    let weeks = [];
    for (let i = 1; i < 1 + parseInt(planDetails.numOfWeeks); i++) {
      weeks.push(i);
    }
    setWeeks(weeks);
  };

  const workoutDays = () => {
    let days = [];
    for (let i = 1; i < 1 + parseInt(planDetails.numOfWeeks); i++) {
      days.push(i);
    }
    setDays(days);
  };

  return (
    <div>
      <Link to="/">
        <div className="text-white">My created workout plans</div>
      </Link>
      <br></br>
      <div className={`${isActive ? "f" : "hidden"}`}>
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
            onClick={() => {
              toggleDisplay();
              workoutWeeks();
              workoutDays();
            }}
          >
            Add exercises
          </button>
        </form>
      </div>
      <div className={`${isActive ? "hidden" : "f"}`}>
        {weeks.map((week) => {
          return (
            <div key={week}>
              <h1>Week:{week}</h1>
              {days.map((day) => {
                return <div key={week + day}>Day: {day} </div>;
              })}
            </div>
          );
        })}
        <table>
          <thead>
            <tr>
              <th>Exercise:</th>
              <th>Sets:</th>
              <th>Reps:</th>
              <th>Description:</th>
            </tr>
          </thead>
        </table>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
          onClick={toggleDisplay}
        >
          Edit plan details
        </button>
      </div>
    </div>
  );
};

export default TestCreateWorkout;
