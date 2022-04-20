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
  const [days, setDays] = useState([1]);
  const [exercises1, setExercises1] = useState([1]);
  const [exercises2, setExercises2] = useState([1]);
  const [exercises3, setExercises3] = useState([1]);
  const [exercises4, setExercises4] = useState([1]);
  const [exercises5, setExercises5] = useState([1]);
  const [exercises6, setExercises6] = useState([1]);
  const [exercises7, setExercises7] = useState([1]);

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
    const data = new FormData(exerciseForm.current); //////////////////////////////////////////////////////////////////////////////////
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
    let x = e.target.value;
    let exercisesVal = [];

    if (x == 1) {
      exercisesVal = [...exercises1];
      exercisesVal.push(exercises1.length + 1);
      setExercises1(exercisesVal);
    }
    if (x == 2) {
      exercisesVal = [...exercises2];
      exercisesVal.push(exercises2.length + 1);
      setExercises2(exercisesVal);
    }
    if (x == 3) {
      exercisesVal = [...exercises3];
      exercisesVal.push(exercises3.length + 1);
      setExercises3(exercisesVal);
    }
    if (x == 4) {
      exercisesVal = [...exercises4];
      exercisesVal.push(exercises4.length + 1);
      setExercises4(exercisesVal);
    }
    if (x == 5) {
      exercisesVal = [...exercises5];
      exercisesVal.push(exercises5.length + 1);
      setExercises5(exercisesVal);
    }
    if (x == 6) {
      exercisesVal = [...exercises6];
      exercisesVal.push(exercises6.length + 1);
      setExercises6(exercisesVal);
    }
    if (x == 7) {
      exercisesVal = [...exercises7];
      exercisesVal.push(exercises7.length + 1);
      setExercises7(exercisesVal);
    }

    console.log(exercisesVal);
  };

  useEffect(() => {
    workoutWeeks();
  }, [workoutPlan.numOfWeeks]);

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
              {days.map((day) => {
                return (
                  <div key={week + day} name={`exercise${day}`}>
                    <h1>Day: {day} </h1>
                    <button
                      className="text-white bg-purple-200 hover:bg-purple-100"
                      onClick={(e) => addExercise(e)}
                      value={day}
                    >
                      Add another exercise
                    </button>
                    {exercises1.map((exercise) => {
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
