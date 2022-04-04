import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WORKOUT_PLAN } from "../utils/queries";
import { ADD_WORKOUT_PLAN_TO_USER } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from "../utils/auth";
import decode from 'jwt-decode';

const SingleWorkout = () => {
  const { _id: userParam } = useParams();

  const [addWorkoutPlanToUser] = useMutation(ADD_WORKOUT_PLAN_TO_USER);

  const decoded = decode(localStorage.getItem('id_token'));
  // console.log(decoded.data._id);

  const { loading, data } = useQuery(GET_WORKOUT_PLAN, {
    variables: { _id: userParam },
    fetchPolicy: "no-cache",
  });

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  const workout = data?.getWorkoutPlan || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  const addClick = async (event) => {
    event.preventDefault();
    await addWorkoutPlanToUser({
      variables: {
        id: decoded.data._id,
        workoutPlan: userParam,
      },
    });
    console.log(data);
  }

  return (
    <div className="justify-center bg-white">
      <div className="inline-flex" onClick={addClick}>
        {" "}
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
          />
        </svg>
        <p>Add to my workouts</p>

        
      </div>
      <h1 className="text-3xl text-center border-b border-black bg-purple-100 text-black">
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
              <h1 className="text-center text-2xl bg-gray">
                - Week {week.weekNumber} -
              </h1>
              <a href="#top">
                <p className="text-center">Return to top</p>
              </a>

              {week.days.map((day) => {
                return (
                  <div key={day.dayOfWeek}>
                    <h1 className="font-bold bg-purple-100 text-lg">
                      {day.dayOfWeek}
                    </h1>
                    <table className="w-full bg-gray border-t border-b border-black">
                      <thead className="bg-white">
                        <tr>
                          <th className="w-1.5 text-center px-4 py-4 border-r border-black">
                            <div className="font-bold">Exercise</div>
                          </th>
                          <th className="w-1.5 text-center px-4 py-4 border-r border-black">
                            <div className="font-bold">Sets</div>
                          </th>
                          <th className="w-1.5 text-center px-4 py-4 border-r border-black">
                            <div className="font-bold">Reps</div>
                          </th>
                          <th className="w-1.5 text-center px-4 py-4">
                            <div className="font-bold">Description</div>
                          </th>
                        </tr>
                      </thead>
                      {day.exercises.map((exercise, index) => {
                        if (index % 2 === 0) {
                          return (
                            // key error needs to be made unique

                            <tbody key={exercise.name} className="">
                              <tr>
                                <td className="border-t border-r border-black">
                                  <Link to={`/exercise/${exercise._id}`}>
                                    {exercise.name}
                                  </Link>
                                </td>
                                <td className="text-center border-t border-r border-black">
                                  {exercise.sets}
                                </td>
                                <td className="text-center border-t border-r border-black">
                                  {exercise.reps}
                                </td>
                                <td className="border-t border-blac">
                                  {exercise.description}
                                </td>
                              </tr>
                            </tbody>
                          );
                        } else {
                          return (
                            // key error needs to be made unique

                            <tbody key={exercise.name} className=" bg-white">
                              <tr>
                                <td className="border-t border-r border-black">
                                  <Link to={`/exercise/${exercise._id}`}>
                                    {exercise.name}
                                  </Link>
                                </td>
                                <td className="text-center border-t border-r border-black">
                                  {exercise.sets}
                                </td>
                                <td className="text-center border-t border-r border-black">
                                  {exercise.reps}
                                </td>
                                <td className="">{exercise.description}</td>
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
