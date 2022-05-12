import { React, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useMutation, useLazyQuery } from "@apollo/client";
import { FcPlanner, FcEmptyTrash } from "react-icons/fc";
import { GrEdit } from "react-icons/gr";
import { REMOVE_WORKOUT_PLAN_FROM_USER } from "../utils/mutations";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { BiLike } from "react-icons/bi";

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
  }, [data]);

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
        <div className="text-white hover:text-purple-100 py-2 bg-purple-200 text-center rounded bold">
          <Link to="/createworkoutplan/">Create a workout</Link>
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
    <main className="px-2">
      <h1 className="text-white text-center pb-1 text-lg bold">My created plans</h1>
      <br></br>
      <div className="text-white hover:text-purple-100 py-2 bg-purple-200 text-center rounded bold">
        <Link to="/createworkoutplan/">Create a workout</Link>
      </div>
      <br></br>
      <div className="flex-row justify-center pb-6" key={"edit" + user._id}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto gap-3">
          {user.workoutPlan?.map((workout) => {
            if (workout.ownerId._id === decoded.data._id) {
              return (
                <div
                  className="relative content-center bg-white text-center rounded-md px-10 py-5"
                  key={workout._id}
                >
                  <Link
                    className="items-center"
                    to={`/workoutupdate/${workout._id}`}
                  >
                    {" "}
                    <div className="items-center text-purple-100 text-bold text-lg">
                      <GrEdit size={36} className="absolute top-2 left-2" />
                      {workout.title}
                    </div>
                    <div className="absolute top-0 right-0">
                      <BiLike size={58} />{" "}
                    </div>
                    <div className="absolute top-6 right-5 text-purple-200">
                      {workout.likes}
                    </div>
                    <div> {workout.type}</div>
                    <div className="italic"> {workout.description}</div>
                  </Link>
                </div>
              );
            }
          })}
        </div>
      </div>
      <h1 className="text-white text-center pb-2 text-lg bold">My saved workout plans</h1>
      <br></br>
      <div className="flex-row justify-center" key={user._id}>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-auto gap-3">
          {user.workoutPlan?.map((workout) => {
            if (workout.ownerId._id !== decoded.data._id) {
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
                      <FcPlanner size={48} className="absolute top-1 left-1" />
                      {workout.title}
                    </div>
                    <div className="absolute top-0 right-0">
                      <BiLike size={58} />{" "}
                    </div>
                    <div className="absolute top-6 right-5 text-purple-200">
                      {workout.likes}
                    </div>
                    <div> {workout.type}</div>
                    <div className="italic"> {workout.description}</div>
                    <div>Created by: {workout.ownerId.username}</div>
                  </Link>
                  <div>
                    <button
                      className="text-md hover:text-purple-100 hover:cursor-pointer hover:font-bold absolute bottom-0 right-1"
                      onClick={removeClick}
                      value={workout._id}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </main>
  );
};

export default Profile;
