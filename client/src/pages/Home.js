import React from "react";
import { useQuery } from "@apollo/client";
import { GET_WORKOUT_PLANS } from "../utils/queries";
import { Link } from "react-router-dom";
import { FcPlanner } from "react-icons/fc";
import { BiLike } from "react-icons/bi";

const Home = () => {
  const { loading, data } = useQuery(GET_WORKOUT_PLANS, {
    fetchPolicy: "no-cache",
  });
  const workoutList = data?.getWorkoutPlans || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  // returns list of current workout plans available with links to each when clicked
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto gap-3 px-2">
          {workoutList.map((workout) => {
            return (
              <div
                key={workout._id}
                className="relative content-center bg-white text-center rounded-md px-10 py-5"
              >
                <div className="absolute top-0 right-0">
                  <BiLike size={58} />{" "}
                </div>
                <div className="absolute top-6 right-5 text-purple-200">
                  {workout.likes}
                </div>

                <Link
                  className="items-center"
                  to={`/workoutplan/${workout._id}`}
                >
                  {" "}
                  <div className="items-center text-purple-100 text-bold text-lg">
                    <FcPlanner size={56} className="absolute top-2 left-2" />
                    {workout.title}
                  </div>
                  <div> Type: {workout.type}</div>
                  <div className="italic"> {workout.description}</div>
                  <div> Number of Weeks: {workout.numOfWeeks}</div>
                  <div> Created by: {workout.ownerId.username}</div>
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
