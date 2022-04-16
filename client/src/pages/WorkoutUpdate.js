import React, { useState } from "react";
import { GET_EXERCISES } from "../utils/queries";
import { useQuery } from "@apollo/client";

const WorkoutUpdate = () => {
  const { loading, data } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });
  const exerciseList = data?.getExercises || [];

  const [weeks, setWeeks] = useState([1]);
  const [days, setDays] = useState([1]);

  //   Create array to map for weeks and days in workout
  // const workoutWeeks = () => {
  //   let weeks = [];
  //   for (let i = 1; i < 1 + parseInt(planDetails.numOfWeeks); i++) {
  //     weeks.push(i);
  //   }
  //   setWeeks(weeks);
  // };

  // const workoutDays = () => {
  //   let days = [];
  //   for (let i = 1; i < 1 + parseInt(planDetails.numOfDays); i++) {
  //     days.push(i);
  //   }
  //   setDays(days);
  // };

  return (
    <div>
      {weeks.map((week) => {
        return (
          <div key={week}>
            <h1>Week:{week}</h1>
            {days.map((day) => {
              return (
                <div key={week + day}>
                  <h1>Day: {day} </h1>
                  <form className="bg-purple-100 shadow-md px-2 py-2">
                    <div className="grid grid-cols-6 gap-2">
                      <select
                        className="col-span-2 form-select form-select-sm appearance-none block w-full px-2 text-md text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        aria-label="exercise"
                      >
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
