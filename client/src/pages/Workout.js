import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_WORKOUT_PLANS } from "../utils/queries";

import testImage from "../assets/images/proj2.png";

const Workout = () => {
  const { loading, data } = useQuery(GET_WORKOUT_PLANS, {
    fetchPolicy: "no-cache",
  });

  const workoutList = data?.getWorkoutPlans || [];
  console.log(workoutList);

  return (
    <div className="justify-center bg-teal-300">
      <h1 className="text-2xl text-center">Checkout these workouts!</h1>
      {workoutList.map((workout) => {
        return (
          <div key={workout._id} className="bg-teal-200 w-full">
            <h1 className="grid grid-cols-3 text-center mx-auto">
              <div className="px-5">{workout.title}</div>
              <div className="px-5">Workout type: {workout.type}</div>
              <div className="px-5">Number of weeks: {workout.numOfWeeks}</div>
            </h1>
            <p>{workout.description}</p>
            <br></br>
            {workout.plan[0].weeks.map((week) => {
              return (
                <div key={week.weekNumber}>
                  <h1 className="bg-white text-center">
                    - Week {week.weekNumber} -
                  </h1>

                  {week.days.map((day) => {
                    return (
                      <div key={day.dayOfWeek}>
                        <h1>{day.dayOfWeek}</h1>
                        <table className="w-full bg-gray-200 border border-black">
                          <thead>
                            <tr>
                              <th className="w-1.5 text-center px-4 py-4 border border-black">
                                <div className="font-bold bg-gray-200">
                                  Exercise
                                </div>
                              </th>
                              <th className="w-1.5 text-center b px-4 py-4 border border-black">
                                <div className="font-bold bg-gray-200">
                                  Sets
                                </div>
                              </th>
                              <th className="w-1.5 text-center  px-4 py-4 border border-black">
                                <div className="font-bold bg-gray-200">
                                  Reps
                                </div>
                              </th>
                              <th className="w-1.5 text-center  px-4 py-4 border border-black">
                                <div className="font-bold bg-gray-200">
                                  Description
                                </div>
                              </th>
                            </tr>
                          </thead>
                          {day.exercises.map((exercise) => {
                            return (
                              // key error needs to be made unique
                              <tbody
                                key={exercise.name}
                                className="border border-black"
                              >
                                <tr>
                                  <td>{exercise.name}</td>
                                  <td className="text-center border border-black">
                                    {exercise.sets}
                                  </td>
                                  <td className="text-center border border-black">
                                    {exercise.reps}
                                  </td>
                                  <td className="border border-black">
                                    {exercise.description}
                                  </td>
                                </tr>
                              </tbody>
                            );
                          })}
                        </table>
                        <br></br>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Workout;
