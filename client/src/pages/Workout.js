import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_WORKOUT_PLANS } from "../utils/queries";

import testImage from "../assets/images/proj2.png";

const Workout = () => {
  const { loading, data } = useQuery(GET_WORKOUT_PLANS, {
    fetchPolicy: "no-cache",
  });

  const workoutList = data?.getWorkoutPlans || [];
  console.log(workoutList);

  return (
    <div className="container flex-col justify-center items-center bg-teal-300">
      <h1 className="text-2xl">Checkout these workouts!</h1>

      <div className="mt-4 grid lg:grid-cols-3 gap-5">
        {workoutList.map((workout) => {
          return (
            <div className="card" key={workout._id}>
              <img
                src={testImage}
                alt="benchpress"
                className="w-full h-44 object-cover"
              />
              <div className="m-2">
                <Link to="/Exercise">
                  <div className="font-bold">{workout.title}</div>
                  <div className="text-md">
                    Description{workout.description}
                  </div>
                  <div className="text-md">Workout type:{workout.type}</div>
                  <div className="font-bold">
                    Weeks in plan: {workout.numOfWeeks}
                  </div>
                </Link>
                <div className="md:flex justify-center">
                  <div className="txt-lg">
                    {workout.plan[0].weeks.map((week) => {
                      return (
                        <div>
                          Week:{week.weekNumber}
                          <div>
                            {" "}
                            {week.days.map((day) => {
                              return (
                                <div>
                                  Day of week:{day.dayOfWeek}
                                  {day.exercises.map((exercise) => {
                                    return (
                                      <div>
                                        <div>{exercise.name}</div>
                                        <div>{exercise.description}</div>
                                        <div>Muscle:{exercise.muscleGroup}</div>
                                        <div>Sets:{exercise.sets}</div>
                                        <div>Reps:{exercise.reps}</div>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <div className="text-md">Sets: {workout.plan.weeks.sets}</div> */}
                  <div className="text-md">Reps: {workout.reps}</div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">exercise X</div>
            <div className="flex-1">
              <div className="text-md">Sets: 3</div>
              <div className="text-md">Reps: 12</div>
            </div>

            <div className="text-lg">Intensity: 8</div>
          </div>
        </div>
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">exercise X</div>
            <div className="text-md">Sets: 3</div>
            <div className="text-md">Reps: 12</div>
          </div>
        </div>
      </div>

      {/* <div className="border-t-4"></div>

      <div className="mt-4 grid lg:grid-cols-3 gap-5">
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">exercise X</div>
            <div className="text-md">Sets: 3</div>
            <div className="text-md">Reps: 12</div>
          </div>
        </div>
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">exercise X</div>
            <div className="text-md">Sets: 3</div>
            <div className="text-md">Reps: 12</div>
          </div>
        </div>
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">exercise X</div>
            <div className="text-md">Sets: 3</div>
            <div className="text-md">Reps: 12</div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Workout;
