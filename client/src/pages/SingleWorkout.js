import React, { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_WORKOUT_PLAN } from "../utils/queries";
import {
  ADD_WORKOUT_PLAN_TO_USER,
  REMOVE_WORKOUT_PLAN_LIKE,
  ADD_WORKOUT_PLAN_LIKE,
} from "../utils/mutations";
import { GrEdit } from "react-icons/gr";
import { BiLike } from "react-icons/bi";

import Auth from "../utils/auth";
import decode from "jwt-decode";
import { isCompositeType } from "graphql";

const SingleWorkout = () => {
  const { _id: userParam } = useParams();

  const [addWorkoutPlanToUser] = useMutation(ADD_WORKOUT_PLAN_TO_USER);
  const [addPlanLike] = useMutation(ADD_WORKOUT_PLAN_LIKE);
  const [removePlanLike] = useMutation(REMOVE_WORKOUT_PLAN_LIKE);

  const [userLike, setUserLike] = useState("false");

  const { loading, data } = useQuery(GET_WORKOUT_PLAN, {
    variables: { id: userParam },
    fetchPolicy: "no-cache",
  });

  const workout = data?.getWorkoutPlan || [];

  console.log(workout);

  useEffect(() => {
    if (!loading) {
      if (workout.userLikes.includes(decoded.data._id) === true) {
        setUserLike(false);
      }
    }
  }, [workout.plan]);

  if (Auth.loggedIn() === false) {
    return <Navigate to="/login" />;
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (decoded.data._id === workout.ownerId._id) {
    return (
      <main key={workout._id}>
        <div className="relative justify-center bg-purple-200 rounded-lg px-4 pt-4 pb-1">
          <div className="hover:font-bold text-right">
            <Link to={{ pathname: `/workoutupdate/${workout._id}` }}>
              <GrEdit size={30} className="absolute top-1 right-1" />
              <p className="hover:cursor-pointer absolute top-1 right-8">
                Edit workout
              </p>
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
            <div className="px-5 pb-2 text-center italic border-b">
              {workout.description}
            </div>

            <div className="flex justify-center text-center mx-auto pt-1">
              <p className="pr-2">Jump to week.. </p>
              {workout.plan[0].weeks.map((week) => {
                return (
                  <div key={week.weekNumber} className="pl-1">
                    <a href={`#${week.weekNumber}`}>
                      {" "}
                      <p className="hover:font-bold rounded-full px-2 border-2">
                        {week.weekNumber}{" "}
                      </p>
                    </a>
                  </div>
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
              </div>

              {week.days.map((day) => {
                return (
                  <div key={day + day.dayOfWeek} className="rounded-lg">
                    <h1 className="font-bold bg-purple-100 text-xl text-center rounded-t-lg">
                      {day.dayOfWeek}
                    </h1>
                    <table className="w-full table-fixed bg-gray border-t border-b border-black rounded-lg ">
                      <thead className="bg-white">
                        <tr className="row space-x-3">
                          <th className="w-2/4 text-center border-r border-black">
                            <div className="font-bold">Exercise</div>
                          </th>
                          <th className="w-3/12 text-center border-r border-black">
                            <div className="font-bold">Sets</div>
                          </th>
                          <th className="w-3/12 text-center border-r border-black">
                            <div className="font-bold">Reps</div>
                          </th>
                          <th className="w-3/4 text-center  ">
                            <div className="font-bold">Description</div>
                          </th>
                        </tr>
                      </thead>
                      {day.exercises.map((exercise, index) => {
                        if (index % 2 === 0) {
                          return (
                            <tbody key={index}>
                              <tr className="row">
                                <td className="text-center break-words border-t border-r border-black col">
                                  <Link
                                    to={`/exercise/${exercise.exerciseId._id}`}
                                  >
                                    {exercise.exerciseId.name}
                                  </Link>
                                </td>
                                <td className="text-center border-t border-r border-black w-0">
                                  {exercise.userSets}
                                </td>
                                <td className="text-center border-t border-r border-black w-0">
                                  {exercise.userReps}
                                </td>
                                <td className="p-2 border-t border-black border-b">
                                  {exercise.exerciseId.description}
                                </td>
                              </tr>
                            </tbody>
                          );
                        } else if (day.exercises.length - 1 === index) {
                          return (
                            <tbody key={index} className="bg-white">
                              <tr className="row">
                                <td className="text-center break-words border-t border-r border-black rounded-b-lg">
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
                                <td className="p-2 border-t border-black border-b rounded-b-lg">
                                  {exercise.exerciseId.description}
                                </td>
                              </tr>
                            </tbody>
                          );
                        } else
                          return (
                            <tbody key={index} className="bg-white">
                              <tr className="row">
                                <td className="text-center break-words border-t border-r border-black">
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
                                <td className="p-2 border-t border-black border-b">
                                  {exercise.exerciseId.description}
                                </td>
                              </tr>
                            </tbody>
                          );
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
  }
  return (
    <main key={"plan"}>
      <div className="relative justify-center bg-purple-200 rounded-lg p-10">
        <div className="hover:font-bold text-right" onClick={addClick}>
          <Link to={{ pathname: `/me` }}>
            {" "}
            <svg
              className="w-8 h-8 absolute right-0 top-0"
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
            <p className="text-sm hover:cursor-pointer absolute right-1 top-6">
              Add to my workouts
            </p>
          </Link>
        </div>
        <div className={`${userLike ? "f" : "hidden"}`}>
          <button
            onClick={() => {
              addLike();
              setUserLike(!userLike);
            }}
            className="hover:cursor-pointer hover:text-white absolute top-1 left-0"
          >
            <BiLike size={36} /> Like
          </button>
        </div>
        <div className={`${userLike ? "hidden" : "f"}`}>
          <button
            onClick={() => {
              removeLike();
              setUserLike(!userLike);
            }}
            className="hover:cursor-pointer hover:text-white absolute top-1 left-1"
          >
            Remove like
          </button>
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
          <div className="px-5 pb-2 text-center italic border-b">
            {workout.description}
          </div>

          <div className="flex justify-center text-center mx-auto pt-1">
            <p className="pr-2">Jump to week.. </p>
            {workout.plan[0].weeks.map((week) => {
              return (
                <div key={week.weekNumber} className="pl-1">
                  <a href={`#${week.weekNumber}`}>
                    {" "}
                    <p className="hover:font-bold rounded-full px-2 border-2">
                      {week.weekNumber}{" "}
                    </p>
                  </a>
                </div>
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
            </div>

            {week.days.map((day) => {
              return (
                <div key={day + day.dayOfWeek} className="rounded-lg">
                  <h1 className="font-bold bg-purple-100 text-xl text-center rounded-t-lg">
                    {day.dayOfWeek}
                  </h1>
                  <table className="w-full table-fixed bg-gray border-t border-b border-black rounded-b-lg ">
                    <thead className="bg-white">
                      <tr>
                        <th className="w-2/4 text-center px-4 py-4 border-r border-black">
                          <div className="font-bold">Exercise</div>
                        </th>
                        <th className="w-3/12 text-center px-4 py-4 border-r border-black">
                          <div className="font-bold">Sets</div>
                        </th>
                        <th className="w-3/12 text-center px-4 py-4 border-r border-black">
                          <div className="font-bold">Reps</div>
                        </th>
                        <th className="w-3/4 text-center px-4 py-4">
                          <div className="font-bold">Description</div>
                        </th>
                      </tr>
                    </thead>
                    {day.exercises.map((exercise, index) => {
                      if (index % 2 === 0) {
                        return (
                          <tbody key={index}>
                            <tr>
                              <td className="text-center break-words border-t border-r border-black">
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
                              <td className="border-t border-black p-2">
                                {exercise.exerciseId.description}
                              </td>
                            </tr>
                          </tbody>
                        );
                      } else if (day.exercises.length - 1 === index) {
                        return (
                          <tbody key={index} className="bg-white">
                            <tr className="row">
                              <td className="text-center break-words border-t border-r border-black rounded-b-lg">
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
                              <td className="p-2 border-t border-black border-b rounded-b-lg">
                                {exercise.exerciseId.description}
                              </td>
                            </tr>
                          </tbody>
                        );
                      } else {
                        return (
                          <tbody key={index} className="bg-white">
                            <tr className="row">
                              <td className="text-center break-words border-t border-r border-black">
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
                              <td className="p-2 border-t border-black border-b">
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
