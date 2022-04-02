import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISE } from "../utils/queries";
// GiShoulderArmor
// GiMuscularTorso
// GiAbdominalArmor
// GiLeg
// GiBiceps
// import { FaAngular } from "react-icons/fa";

const SingleExercise = () => {
  const { _id: userParam } = useParams();
  console.log(userParam);
  //   let icon;
  const { loading, data } = useQuery(GET_EXERCISE, {
    variables: { _id: userParam },
    fetchPolicy: "no-cache",
  });

  const exercise = data?.getExercise || [];
  console.log(exercise);

  if (loading) {
    return <div>Loading...</div>;
  }

  //   if (exercise.muscleGroup === "Chest") {
  //     icon = FaAngular;
  //   }

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
