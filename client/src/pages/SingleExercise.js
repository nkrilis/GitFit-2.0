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
    <div key={exercise._id} className="bg-orange-300">
      <div>{exercise.name}</div>
      <div>{exercise.muscleGroup}</div>
      <div>{exercise.description}</div>
      <div>{exercise.sets}</div>
      <div>{exercise.reps}</div>
    </div>
  );
};

export default SingleExercise;
