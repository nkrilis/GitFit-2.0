import React, { useEffect, useState, useRef } from "react";
import { GET_EXERCISES, GET_WORKOUT_PLAN } from "../utils/queries";
import { UPDATE_WORKOUT_PLAN } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const WorkoutUpdate = () => {
  const { data: dataExercise } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });
  const exerciseList = dataExercise?.getExercises || [];

  const { loading, data: dataWorkoutPlan } = useQuery(GET_WORKOUT_PLAN, {
    variables: { id: "2" },
    fetchPolicy: "no-cache",
  });
  const workoutPlan = dataWorkoutPlan?.getWorkoutPlan || [];

  console.log(workoutPlan);

  const [updateWorkoutPlan] = useMutation(UPDATE_WORKOUT_PLAN);

  const [weeks, setWeeks] = useState([]);
  const [day1, setday1] = useState([{ day: 1, exercises: [1] }]);
  const [day2, setday2] = useState([{ day: 2, exercises: [1] }]);
  const [day3, setday3] = useState([{ day: 3, exercises: [1] }]);
  const [day4, setday4] = useState([{ day: 4, exercises: [1] }]);
  const [day5, setday5] = useState([{ day: 5, exercises: [1] }]);
  const [day6, setday6] = useState([{ day: 6, exercises: [1] }]);
  const [day7, setday7] = useState([{ day: 7, exercises: [1] }]);
  const [days, setDays] = useState({
    day: [day1, day2, day3, day4, day5, day6, day7],
  });

  const exerciseForm = useRef(null);

  // function to create workout plan in database
  const planUpdate = async () => {
    let planVal = [
      ...workoutPlan.plan[0].weeks[0].days.map((day) => {
        if (day.dayOfWeek === "Monday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 5,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 12,
              },
            ],
          };
        }
        if (day.dayOfWeek === "Tuesday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "3",
                userSets: 4,
                userReps: 21,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 21,
              },
            ],
          };
        }
        if (day.dayOfWeek === "Wednesday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 125,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 12,
              },
            ],
          };
        }
        if (day.dayOfWeek === "Thursday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "3",
                userSets: 4,
                userReps: 21,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 21,
              },
            ],
          };
        }
        if (day.dayOfWeek === "Friday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 5,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 12,
              },
            ],
          };
        }
        if (day.dayOfWeek === "Saturday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "3",
                userSets: 4,
                userReps: 21,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 21,
              },
            ],
          };
        }
        if (day.dayOfWeek === "Sunday") {
          delete day.__typename;
          return {
            ...day,
            exercises: [
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 5,
              },
              {
                exerciseId: "1",
                userSets: 4,
                userReps: 12,
              },
            ],
          };
        }
        delete day.__typename;
        return day;
      }),
    ];

    console.log(planVal);

    await updateWorkoutPlan({
      variables: {
        id: "2",
        title: workoutPlan.title,
        description: workoutPlan.description,
        type: workoutPlan.type,
        numOfWeeks: parseInt(workoutPlan.numOfWeeks),
        plan: [
          {
            weeks: [
              {
                weekNumber: 1,
                days: planVal,
              },
            ],
          },
        ],
      },
    });
  };

  const formSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(exerciseForm.current);
    let array = [];
    for (const [y, z] of data) console.log(y, z);

    array.push(data.getAll("sets1"));
    console.log(array);
    let x = document.querySelector("#exerciseSel1");

    console.log(x);
    console.log(x.options[x.selectedIndex].value);
  };

  // Create array to map for weeks and days in workout
  const workoutWeeks = () => {
    let weeksVal = [];
    // if(!workoutPlan.numOfWeeks === []) {
    // }
    for (let i = 1; i < 1 + workoutPlan.numOfWeeks; i++) {
      weeksVal.push(i);
    }
    setWeeks(weeksVal);
  };

  const workoutDays = () => {
    let daysVal = [...days];

    if (daysVal.length < 7) daysVal.push(days.length + 1);

    setDays(daysVal);
  };

  const removeDay = (e) => {
    e.preventDefault();
    let i = e.target.getAttribute("data-id");
    let daysVal = [...days];
    let newVal = daysVal.filter((day) => day !== parseInt(i));
    setDays(newVal);
  };

  const addExercise = (e) => {
    e.preventDefault();
    let x = parseInt(e.target.value);
    let exercisesVal = [];

    if (x === 1) {
      exercisesVal = [...day1];
      exercisesVal.push(day1.length + 1);
      setday1(exercisesVal);
    }
    if (x === 2) {
      exercisesVal = [...day2];
      exercisesVal.push(day2.length + 1);
      setday2(exercisesVal);
    }
    if (x === 3) {
      exercisesVal = [...day3];
      exercisesVal.push(day3.length + 1);
      setday3(exercisesVal);
    }
    if (x === 4) {
      exercisesVal = [...day4];
      exercisesVal.push(day4.length + 1);
      setday4(exercisesVal);
    }
    if (x === 5) {
      exercisesVal = [...day5];
      exercisesVal.push(day5.length + 1);
      setday5(exercisesVal);
    }
    if (x === 6) {
      exercisesVal = [...day6];
      exercisesVal.push(day6.length + 1);
      setday6(exercisesVal);
    }
    if (x === 7) {
      exercisesVal = [...day7];
      exercisesVal.push(day7.length + 1);
      setday7(exercisesVal);
    }

    console.log(exercisesVal);
  };

  useEffect(() => {
    workoutWeeks();
  }, [workoutPlan.numOfWeeks]);

  const help = function () {
    //////////////////////////////////////////////////////////////////////////////////
    days.day.map((day) => {
      return console.log(day);
    });
  };
  console.log(days);
  console.log(days.day);
  console.log(days.day[0]);

  return (
    <div>
      {weeks.map((week) => {
        return (
          <div key={week}>
            <div className="grid grid-cols-6">
              <h1 className="col-span-5">Week:{week}</h1>
              <button
                className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                onClick={workoutDays}
              >
                Add another day
              </button>
            </div>
            <form
              ref={exerciseForm}
              onSubmit={formSubmit}
              className="bg-purple-100 shadow-md px-2 py-2"
            >
              {days.day.map((day) => {
                return (
                  <div key={week + day.day} name={`exercise${day.day}`}>
                    <h1>Day: {day.day} </h1>
                    <button
                      className="text-white bg-purple-200 hover:bg-purple-100"
                      onClick={(e) => addExercise(e)}
                      value={day.day}
                    >
                      Add another exercise
                    </button>
                    {day.exercises.map((exercise) => {
                      return (
                        <div key={exercise}>
                          <div className="grid grid-cols-7 gap-2">
                            <select
                              id={`exerciseSel${day}`}
                              className="col-span-2 form-select form-select-sm appearance-none block w-full px-2 text-md text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              aria-label="exercise"
                            >
                              {exerciseList.map((exercise) => {
                                return (
                                  <option
                                    name={exercise.name}
                                    key={exercise._id}
                                    value={exercise.name}
                                  >
                                    {exercise.name}
                                  </option>
                                );
                              })}
                            </select>

                            <input
                              name={`sets${day}`}
                              type="number"
                              min="1"
                              max="50"
                              defaultValue={1}
                            />

                            <input
                              name={`reps${day}`}
                              type="number"
                              min="1"
                              max="50"
                              defaultValue={1}
                            />

                            <textarea
                              className="col-span-2"
                              name="description"
                              type="text"
                              defaultValue={""}
                            ></textarea>

                            <button
                              className="font-xl hover:text-white bg-purple-200 hover:cursor-pointer hover:font-bold"
                              data-id={day}
                              // onClick={}
                            >
                              Delete Exercise
                            </button>
                          </div>
                        </div>
                      );
                    })}
                    <button
                      className="font-xl hover:text-white hover:cursor-pointer hover:font-bold"
                      data-id={day}
                      onClick={removeDay}
                    >
                      Delete day
                    </button>
                  </div>
                );
              })}
              <input type="submit" />
            </form>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Edit plan details
            </button>
          </div>
        );
      })}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={planUpdate}
      >
        Update test
      </button>
    </div>
  );
};

export default WorkoutUpdate;
