import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_WORKOUT_PLAN } from "../utils/queries";

const SingleWorkout = () => {
  const { _id: userParam } = useParams();

  const { loading, data } = useQuery(GET_WORKOUT_PLAN, {
    variables: { _id: userParam },
    fetchPolicy: "no-cache",
  });

  const workout = data?.getWorkoutPlan || [];
  console.log(workout);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-center bg-teal-300">
      <h1 className="text-2xl text-center">{workout.title}</h1>
      <div key={workout._id} className="bg-teal-200 w-full">
        <h1 className="grid grid-cols-2 text-center mx-auto">
          <div className="px-5">Workout type: {workout.type}</div>
          <div className="px-5 pb-2">Number of weeks: {workout.numOfWeeks}</div>
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
                            <div className="font-bold bg-gray-200">Sets</div>
                          </th>
                          <th className="w-1.5 text-center  px-4 py-4 border border-black">
                            <div className="font-bold bg-gray-200">Reps</div>
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
    </div>
  );
};

export default SingleWorkout;
