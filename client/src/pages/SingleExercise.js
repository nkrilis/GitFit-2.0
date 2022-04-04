import React from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISE } from "../utils/queries";
import Auth from "../utils/auth";
import ReactPlayer from "react-player";

const SingleExercise = () => {
  const { _id: userParam } = useParams();

  const { loading, data } = useQuery(GET_EXERCISE, {
    variables: { _id: userParam },
    fetchPolicy: "no-cache",
  });

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }

  const exercise = data?.getExercise || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="mb-2 mx-3 shadow-md content-center text-center text-white bg-purple-100 rounded-lg py-10"
      key={exercise._id}
    >
      <div className="font-bold">{exercise.name}:</div>
      <div>
        Main muscle: <span className="font-bold">{exercise.muscleGroup}</span>
      </div>
      <br></br>
      <div>{exercise.description}</div>
      <div className="relative pt-5">
        <div className="player-wrapper">
          <ReactPlayer className="react-player" url={exercise.video} />
        </div>
      </div>
    </div>
  );
};

export default SingleExercise;
