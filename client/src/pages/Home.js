import React from "react";
import { useQuery } from "@apollo/client";
import { GET_WORKOUT_PLANS } from "../utils/queries";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, data } = useQuery(GET_WORKOUT_PLANS, {
    fetchPolicy: "no-cache",
  });

  const workoutList = data?.getWorkoutPlans || [];
  console.log(workoutList);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="p-3 grid grid-cols-3">
          {workoutList.map((workout) => {
            return (
              <div className="bg-purple-100 hover:bg-purple-200 text-white text-center">
                <Link
                  className="inline-flex items-center pr-10"
                  to={`/workoutplan/${workout._id}`}
                >
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
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>

                <div> {workout.title}</div>
                <div> {workout.type}</div>
                <div> {workout.description}</div>
              </div>
            );
          })}
          {workoutList.map((workout) => {
            return (
              <div className="">
                <Link
                  className="inline-flex items-center pr-10"
                  to={`/workoutplan/${workout._id}`}
                >
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
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                <div> {workout.title}</div>
                <div> {workout.type}</div>
                <div> {workout.description}</div>
              </div>
            );
          })}
          {workoutList.map((workout) => {
            return (
              <div className="">
                <Link
                  className="inline-flex items-center pr-10"
                  to={`/workoutplan/${workout._id}`}
                >
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
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
                <div> {workout.title}</div>
                <div> {workout.type}</div>
                <div> {workout.description}</div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
