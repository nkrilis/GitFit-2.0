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
    <div className="container flex-col justify-center items-center bg-teal-300">
      <h1 className="text-2xl">Checkout these exercises!</h1>
      <div className="mt-4 grid lg:grid-cols-3 gap-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul className="square">
            {exerciseList.map((exercise) => {
              return (
                <li key={exercise._id}>
                  <Link to={{ pathname: `/exercise/${exercise._id}` }}>
                    {exercise.name}:<br></br>
                    {exercise.description}
                    <br></br>
                    Sets: {exercise.sets} Reps: {exercise.reps}
                    {exercise.muscleGroup}
                    <div className="border-4"></div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Exercise;
