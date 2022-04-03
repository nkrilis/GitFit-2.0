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
    <div className="justify-center bg-gray">
      <h1 className="text-3xl text-center border border-black">
        {workout.title}
      </h1>
      <br></br>
      <div key={workout._id}>
        <div className="grid grid-flow-col text-center mx-auto">
          <div className="px-5">Workout type: {workout.type}</div>
          <div className="px-5 pb-2">Number of weeks: {workout.numOfWeeks}</div>
        </div>
        <div className="px-5 pb-2">{workout.description}</div>

        <div className="grid grid-flow-col text-center mx-auto">
          {workout.plan[0].weeks.map((week) => {
            console.log(week.weekNumber);
            return (
              <a href={`#${week.weekNumber}`}>
                {" "}
                <p className="hover:font-bold">Week: {week.weekNumber} </p>
              </a>
            );
          })}
        </div>

        <br></br>
        {workout.plan[0].weeks.map((week) => {
          console.log(week.weekNumber);
          return (
            <div id={week.weekNumber} key={week.weekNumber}>
              <h1 className="bg-white text-center text-2xl">
                - Week {week.weekNumber} -
              </h1>
              <a href="#top">
                <p className="text-center">Return to top</p>
              </a>

              {week.days.map((day) => {
                return (
                  <div key={day.dayOfWeek}>
                    <h1 className="font-bold bg-white text-lg">
                      {day.dayOfWeek}
                    </h1>
                    <table className="w-full bg-gray border border-black">
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
