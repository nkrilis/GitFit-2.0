import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../utils/queries";

const Exercise = () => {
  const { loading, data } = useQuery(GET_EXERCISES, {
    fetchPolicy: "cache-first",
  });

  const exerciseList = data?.getExercises || [];
  console.log(exerciseList);

  return (
    <div className="container flex-col justify-center items-center">
      <h1 className="text-2xl">Checkout these exercises!</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto mt-2 gap-2">
          {exerciseList.map((exercise) => {
            return (
              <div
                className="card mb-2 mx-3 shadow-md text-center bg-red-300 rounded-lg"
                key={exercise._id}
              >
                <Link to={{ pathname: `/exercise/${exercise._id}` }}>
                  <div className="font-bold">{exercise.name}:</div>
                  <div>{exercise.description}</div>
                  <div className="grid grid-cols-3 mx-auto">
                    <div>Sets: {exercise.sets}</div>{" "}
                    <div>Reps: {exercise.reps}</div>{" "}
                    <div>Muscle: {exercise.muscleGroup}</div>
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
