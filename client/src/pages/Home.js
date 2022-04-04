import React from "react";
import { useQuery } from "@apollo/client";
import { GET_WORKOUT_PLANS } from "../utils/queries";
import { Link } from "react-router-dom";
import { FcPlanner } from "react-icons/fc";

const Home = () => {
  const { loading, data } = useQuery(GET_WORKOUT_PLANS, {
    fetchPolicy: "no-cache",
  });

  const workoutList = data?.getWorkoutPlans || [];
  console.log(workoutList);

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto gap-3">
          {workoutList.map((workout) => {
            return (
              <div className="content-center bg-white text-center rounded-md px-10 py-5">
                <Link
                  className="items-center"
                  to={`/workoutplan/${workout._id}`}
                >
                  {" "}
                  <div className="items-center text-purple-100 text-bold text-lg">
                    <FcPlanner size={56} />
                    {workout.title}
                  </div>
                  <div> {workout.type}</div>
                  <div> {workout.description}</div>
                </Link>
              </div>
            );
          })}
          {workoutList.map((workout) => {
            return (
              <div className="content-center bg-white text-center rounded-md px-10 py-5">
                <Link
                  className="items-center"
                  to={`/workoutplan/${workout._id}`}
                >
                  {" "}
                  <div className="items-center text-purple-100 text-bold text-lg">
                    <FcPlanner size={56} />
                    {workout.title}
                  </div>
                  <div> {workout.type}</div>
                  <div> {workout.description}</div>
                </Link>
              </div>
            );
          })}
          {workoutList.map((workout) => {
            return (
              <div className="content-center bg-white text-center rounded-md px-10 py-5">
                <Link
                  className="items-center"
                  to={`/workoutplan/${workout._id}`}
                >
                  {" "}
                  <div className="items-center text-purple-100 text-bold text-lg">
                    <FcPlanner size={56} />
                    {workout.title}
                  </div>
                  <div> {workout.type}</div>
                  <div> {workout.description}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
