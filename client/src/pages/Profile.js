import { React, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { FcPlanner } from "react-icons/fc";
import { REMOVE_WORKOUT_PLAN_FROM_USER } from "../utils/mutations";

// import ThoughtForm from '../components/ThoughtForm';
// import ThoughtList from '../components/ThoughtList';
import { QUERY_USER, QUERY_ME } from "../utils/queries";

import Auth from "../utils/auth";
import decode from "jwt-decode";

const Profile = () => {
  // const [workoutData, setWorkoutData] = useState([]);
  const { username: userParam } = useParams();

  const [removeWorkoutPlanFromUser] = useMutation(
    REMOVE_WORKOUT_PLAN_FROM_USER,
    {}
  );

  const decoded = decode(localStorage.getItem("id_token"));

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  // useEffect(() => {
  //   if (!loading) {
  //     setWorkoutData(data?.me || data?.user || {});
  //     console.log(workoutData);
  //   }
  // });
  const user = data?.me || data?.user || {};

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

  const removeClick = async (event) => {
    event.preventDefault();

    await removeWorkoutPlanFromUser({
      variables: {
        id: decoded.data._id,
        workoutPlan: event.target.getAttribute("value"),
      },
    });
    window.location.reload();
  };

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
                <div onClick={removeClick} value={workout._id}>
                  Delete
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
