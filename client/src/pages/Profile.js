import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { FcPlanner } from "react-icons/fc";

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';

import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user);
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (!user.workoutPlan) {
    return <h1>Add some workout plans to your list</h1>;
  }

  return (
    <main>
      <div className="flex-row justify-center" key={user._id}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto gap-3">
          {user.workoutPlan.map((workout) => {
            return (
              <div
                className="content-center bg-white text-center rounded-md px-10 py-5"
                key={workout._id}
              >
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
                <svg
                  // absolute top-0 right-0
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Profile;
