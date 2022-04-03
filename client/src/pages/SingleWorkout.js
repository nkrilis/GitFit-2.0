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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="justify-center bg-teal-300">
      <h1 className="text-2xl text-center">{workout.title}</h1>
      <div key={workout._id} className="bg-teal-200">
        <div className="grid grid-flow-col text-center mx-auto">
          <div className="px-5">Workout type: {workout.type}</div>
          <div className="px-5 pb-2">Number of weeks: {workout.numOfWeeks}</div>
        </div>
        <div className="px-5 pb-2">{workout.description}</div>

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
                    <h1 className="font-bold">{day.dayOfWeek}</h1>
                    <table className="w-full bg-gray-200 border border-black">
                      <thead className="bg-white">
                        <tr>
                          <th className="w-1.5 text-center px-4 py-4 border border-black">
                            <div className="font-bold">Exercise</div>
                          </th>
                          <th className="w-1.5 text-center b px-4 py-4 border border-black">
                            <div className="font-bold">Sets</div>
                          </th>
                          <th className="w-1.5 text-center  px-4 py-4 border border-black">
                            <div className="font-bold">Reps</div>
                          </th>
                          <th className="w-1.5 text-center  px-4 py-4 border border-black">
                            <div className="font-bold">Description</div>
                          </th>
                        </tr>
                      </thead>
                      {day.exercises.map((exercise, index) => {
                        if (index % 2 === 0) {
                          return (
                            // key error needs to be made unique

                            <tbody
                              key={exercise.name}
                              className="border border-black"
                            >
                              <tr>
                                <td>
                                  <Link to={`/exercise/${exercise._id}`}>
                                    {exercise.name}
                                  </Link>
                                </td>
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
                        } else {
                          return (
                            // key error needs to be made unique

                            <tbody
                              key={exercise.name}
                              className="border border-black bg-white"
                            >
                              <tr>
                                <td>
                                  <Link to={`/exercise/${exercise._id}`}>
                                    {exercise.name}
                                  </Link>
                                </td>
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
                        }
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
