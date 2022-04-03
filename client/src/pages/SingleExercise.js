import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISE } from "../utils/queries";
import Auth from "../utils/auth";

const SingleExercise = () => {
  const { _id: userParam } = useParams();
  console.log(userParam);

  const { loading, data } = useQuery(GET_EXERCISE, {
    variables: { _id: userParam },
    fetchPolicy: "no-cache",
  });

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const exercise = data?.getExercise || [];
  console.log(exercise);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="card mb-2 mx-3 shadow-md text-center text-white bg-purple rounded-lg"
      key={exercise._id}
    >
      <div className="font-bold">{exercise.name}:</div>
      <div>
        Main muscle: <span className="font-bold">{exercise.muscleGroup}</span>
      </div>
      <div>{exercise.description}</div>
      <div className="grid grid-cols-2 mx-auto">
        <div>Sets: {exercise.sets}</div> <div>Reps: {exercise.reps}</div>{" "}
      </div>
    </div>
  );
};

export default SingleExercise;
