import React, { useEffect, useState } from "react";
import { GET_EXERCISES, GET_WORKOUT_PLAN } from "../utils/queries";
import { useQuery } from "@apollo/client";

const WorkoutUpdate = () => {
  const { data: dataExercise } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });
  const exerciseList = dataExercise?.getExercises || [];

  const { loading, data: dataWorkoutPlan } = useQuery(GET_WORKOUT_PLAN, {
    variables: { id: "55" },
    fetchPolicy: "no-cache",
  });
  const workoutPlan = dataWorkoutPlan?.getWorkoutPlan || [];

  console.log(workoutPlan);

  const [weeks, setWeeks] = useState([]);
  const [days, setDays] = useState([1]);

  // Create array to map for weeks and days in workout
  const workoutWeeks = () => {
    let weeksVal = [];
    // if(!workoutPlan.numOfWeeks === []) {
    // }
    for (let i = 1; i < 1 + workoutPlan.numOfWeeks; i++) {
      weeksVal.push(i);
    }
    setWeeks(weeksVal);
  };

  const workoutDays = () => {
    let daysVal = [...days];

    if (daysVal.length < 7) daysVal.push(days.length + 1);

    setDays(daysVal);
  };

  const removeDay = (e) => {
    e.preventDefault();
    let i = e.target.getAttribute("data-id");
    let daysVal = [...days];
    let newVal = daysVal.filter((day) => day !== parseInt(i));
    setDays(newVal);
  };

  useEffect(() => {
    workoutWeeks();
  }, [workoutPlan]);

  return (
    <div>
      {weeks.map((week) => {
        return (
          <div key={week}>
            <div className="grid grid-cols-6">
              <h1 className="col-span-5">Week:{week}</h1>
              <button
                className="text-white bg-purple-100 hover:bg-purple-200"
                onClick={workoutDays}
              >
                Add another day
              </button>
            </div>
            {days.map((day) => {
              return (
                <div key={week + day}>
                  <h1>Day: {day} </h1>
                  <form className="bg-purple-100 shadow-md px-2 py-2">
                    <div className="grid grid-cols-7 gap-2">
                      <select
                        className="col-span-2 form-select form-select-sm appearance-none block w-full px-2 text-md text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="exercise"
                      >
                        <option selected>"Open this select menu"</option>
                        {exerciseList.map((exercise) => {
                          return (
                            <option
                              id="option"
                              name={exercise.name}
                              key={exercise._id}
                              value={exercise.name}
                            >
                              {exercise.name}
                            </option>
                          );
                        })}
                      </select>

                      <input type="number" min="1" max="50" placeholder="1" />

                      <input type="number" min="1" max="50" placeholder="1" />

                      <textarea
                        className="col-span-2"
                        type="text"
                        placeholder=""
                      ></textarea>
                      <button
                        className="font-xl hover:text-purple-100 hover:cursor-pointer hover:font-bold"
                        data-id={day}
                        onClick={removeDay}
                      >
                        Delete
                      </button>
                    </div>
                  </form>
                </div>
              );
            })}

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Edit plan details
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutUpdate;
