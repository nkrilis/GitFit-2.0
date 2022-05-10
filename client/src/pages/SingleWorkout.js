import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WORKOUT_PLAN } from "../utils/queries";
import {
  ADD_WORKOUT_PLAN_TO_USER,
  REMOVE_WORKOUT_PLAN_LIKE,
  ADD_WORKOUT_PLAN_LIKE,
} from "../utils/mutations";

import Auth from "../utils/auth";
import decode from "jwt-decode";

const SingleWorkout = () => {
  const { _id: userParam } = useParams();

  const [addWorkoutPlanToUser] = useMutation(ADD_WORKOUT_PLAN_TO_USER);
  const [addPlanLike] = useMutation(ADD_WORKOUT_PLAN_LIKE);
  const [removePlanLike] = useMutation(REMOVE_WORKOUT_PLAN_LIKE);

  const { loading, data } = useQuery(GET_WORKOUT_PLAN, {
    variables: { id: userParam },
    fetchPolicy: "no-cache",
  });

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  const workout = data?.getWorkoutPlan || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  const decoded = decode(localStorage.getItem("id_token"));

  const addClick = async (event) => {
    event.preventDefault();
    await addWorkoutPlanToUser({
      variables: {
        id: decoded.data._id,
        workoutPlan: userParam,
      },
    });
  };

  const addLike = async () => {
    await addPlanLike({
      variables: {
        id: workout._id,
        userLikes: decoded.data._id,
      },
    });
  };

  const removeLike = async () => {
    await removePlanLike({
      variables: {
        id: workout._id,
        userLikes: decoded.data._id,
      },
    });
  };

  return (
    <main>
      <div className="justify-center bg-purple-200 rounded-lg p-10">
        <div className="hover:font-bold text-right" onClick={addClick}>
          <Link to={{ pathname: `/me` }}>
            {" "}
            <svg
              className="w-10 h-10"
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
            <p className="hover:cursor-pointer">Add to my workouts</p>
          </Link>
        </div>
        <h1 className="text-3xl text-center  border-black bg-purple-200 text-black">
          {workout.title}
        </h1>
        <br></br>
        <div key={workout._id}>
          <div className="grid grid-flow-col text-center mx-auto">
            <div className="px-5">Workout type: {workout.type}</div>
            <div className="px-5 pb-2">
              Number of weeks: {workout.numOfWeeks}
            </div>
          </div>
          <div className="px-5 pb-2">{workout.description}</div>

          <div className="grid grid-flow-col text-center mx-auto">
            {workout.plan[0].weeks.map((week) => {
              return (
                <a href={`#${week.weekNumber}`} key={week.weekNumber}>
                  {" "}
                  <p className="hover:font-bold">Week: {week.weekNumber} </p>
                </a>
              );
            })}
          </div>
        </div>
      </div>
      <br></br>
      {workout.plan[0].weeks.map((week) => {
        return (
          <div
            className="bg-black rounded-lg"
            id={week.weekNumber}
            key={week.weekNumber}
          >
            <h1 className="text-center text-2xl bg-purple-100 rounded-t-lg">
              - Week {week.weekNumber} -
            </h1>
            <div className=" bg-gray rounded-b-lg">
              <a href="#top">
                <p className="text-center">Return to top</p>
              </a>
              {/* <button onClick={addLike} className="text-purple-100">
              Test add like
            </button>
            <button onClick={removeLike}>Test remove Like</button> */}
            </div>

            {week.days.map((day) => {
              return (
                <div key={day + day.dayOfWeek} className="rounded-lg">
                  <h1 className="font-bold bg-purple-100 text-xl text-center rounded-t-lg">
                    {day.dayOfWeek}
                  </h1>
                  <table className="w-full bg-gray border-t border-b border-black rounded-lg ">
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
                          <tbody key={index}>
                            <tr>
                              <td className="border-t border-r border-black">
                                <Link
                                  to={`/exercise/${exercise.exerciseId._id}`}
                                >
                                  {exercise.exerciseId.name}
                                </Link>
                              </td>
                              <td className="text-center border-t border-r border-black">
                                {exercise.userSets}
                              </td>
                              <td className="text-center border-t border-r border-black">
                                {exercise.userReps}
                              </td>
                              <td className="border-t border-blac">
                                {exercise.exerciseId.description}
                              </td>
                            </tr>
                          </tbody>
                        );
                      } else {
                        return (
                          <tbody
                            key={day.dayofweek + exercise.exerciseId._id}
                            className=" bg-white"
                          >
                            <tr>
                              <td className="border-t border-r border-black">
                                <Link
                                  to={`/exercise/${exercise.exerciseId._id}`}
                                >
                                  {exercise.exerciseId.name}
                                </Link>
                              </td>
                              <td className="text-center border-t border-r border-black">
                                {exercise.userSets}
                              </td>
                              <td className="text-center border-t border-r border-black">
                                {exercise.userReps}
                              </td>
                              <td className="">
                                {exercise.exerciseId.description}
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
            <div className="bg-black">
              <br></br>{" "}
            </div>
          </div>
        );
      })}
    </main>
  );
};

export default SingleWorkout;
