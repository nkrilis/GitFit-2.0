import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../utils/queries";
import Auth from "../utils/auth";

const Exercise = () => {
  const { loading, data } = useQuery(GET_EXERCISES, {
    fetchPolicy: "cache-first",
  });

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  const exerciseList = data?.getExercises || [];

  return (
    <div className="container flex-col justify-center items-center pb-5">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-auto mt-2 gap-2">
          {/* map out exercise properties and creating a link for each to go to a single exercise page */}
          {exerciseList.map((exercise) => {
            return (
              <div
                className="card mb-2 mx-3 text-center text-white bg-purple-100 rounded-lg hover:shadow-white shadow-md"
                key={exercise._id}
              >
                <Link to={{ pathname: `/exercise/${exercise._id}` }}>
                  <div className="font-bold">{exercise.name}:</div>
                  <div>
                    Main muscle:{" "}
                    <span className="font-bold">{exercise.muscleGroup}</span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
export default Exercise;
