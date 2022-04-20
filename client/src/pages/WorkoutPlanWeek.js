import React, { useEffect } from "react";
import UpdateTest from "./UpdateTest";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_EXERCISES, GET_WORKOUT_PLAN } from "../utils/queries";

const WorkoutPlanWeek = () => {
  const { data: dataExercise } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });
  const exerciseList = dataExercise?.getExercises || [];

  const [loadWorkoutPlan, { data: dataWorkoutPlan }] = useLazyQuery(
    GET_WORKOUT_PLAN,
    {
      variables: { id: "test" },
      fetchPolicy: "no-cache",
    }
  );
  const workoutPlan = dataWorkoutPlan?.getWorkoutPlan || [];

  console.log(workoutPlan);

  const weekChange = (e) => {
    let newWeek = e.target.value;

    loadWorkoutPlan();
  };

  useEffect(() => {
    loadWorkoutPlan();
  }, []);

  return (
    <div>
      <UpdateTest week={workoutPlan} />
    </div> //to be updated to send over which week and the info for exercises if pre existing
  );
};

export default WorkoutPlanWeek;
