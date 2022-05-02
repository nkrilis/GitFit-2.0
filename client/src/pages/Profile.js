import { React, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { FcPlanner, FcEmptyTrash } from "react-icons/fc";
import { REMOVE_WORKOUT_PLAN_FROM_USER } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import decode from "jwt-decode";

const Profile = () => {
  const { username: userParam } = useParams();

  const [removeWorkoutPlanFromUser] = useMutation(
    REMOVE_WORKOUT_PLAN_FROM_USER,
    {}
  );

  const decoded = decode(localStorage.getItem("id_token"));

  const [loadQuery, { loading, data }] = useLazyQuery(
    userParam ? QUERY_USER : QUERY_ME,
    {
      variables: { username: userParam },
    }
  );

  useEffect(() => {
    loadQuery();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = data?.me || data?.user || {};

  const removeClick = async (event) => {
    event.preventDefault();

    await removeWorkoutPlanFromUser({
      variables: {
        id: decoded.data._id,
        workoutPlan: event.target.getAttribute("value"),
      },
    });
    loadQuery();
  };

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

  if (user.workoutPlan.length === 0) {
    return (
      <main>
        <div className="text-white">
          <Link to="/workoutupdate/1">Workout management page</Link>
        </div>
        <br></br>
        <Link to="/">
          <h1 className="text-white text-2xl hover:cursor-pointer hover:text-purple-100">
            Add some workout plans to your list
          </h1>
        </Link>
      </main>
    );
  }

  return (
    <main>
      <div className="text-white">
        <Link to="/workoutupdate/1">Workout management page</Link>
      </div>
      <br></br>
      <div className="flex-row justify-center" key={user._id}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto gap-3">
          {user.workoutPlan?.map((workout) => {
            return (
              <div
                className="relative content-center bg-white text-center rounded-md px-10 py-5"
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
                <div className="absolute bottom-0 right-1">
                  <FcEmptyTrash size={40} className="" />
                  <button
                    className="font-xl hover:text-purple-100 hover:cursor-pointer hover:font-bold"
                    onClick={removeClick}
                    value={workout._id}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default Profile;
