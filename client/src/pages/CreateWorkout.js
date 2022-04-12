import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../utils/queries";

// generates a random string id to be attached to each new document/row added
const generator = () => {
  let result = " ";
  for (let i = 0; i < 15; i++) {
    i++;
    result += Math.random().toString(36).substring(2, 6);
  }
  return result;
};

// grabs the exercises to be used in drop down menu
const CreateWorkout = () => {
  const { loading, data } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });

  const exerciseList = data?.getExercises || [];
  console.log(exerciseList);

  const [quantityExercise, setQuantity] = useState([{ id: generator() }]);

  const [workoutValue, setWorkout] = useState({
    name: "BACK SQUAT",
    description:
      "SIT BACK AND DOWN, 15° TOE FLARE, DRIVE YOUR KNEES OUT LATERALLY",
    sets: 4,
    reps: 5,
  });

  const [inputValue, setInputValue] = useState(1);

  //   useEffect(() => {
  //     document.title = quantityExercise;
  //   });

  // when add an exercise is clicked another id is created and added to the array
  const addExercise = () => {
    setQuantity([
      ...quantityExercise,
      {
        id: generator(),
      },
    ]);
    console.log(workoutValue);
  };

  //when exercise is clicked to be removed it is filtered out, if it is the last object in the array then a new blank object is created
  const removeExercise = (e) => {
    let i = e.target.getAttribute("data-id");
    setQuantity(quantityExercise.filter((items) => items.id !== i));
    console.log(i);
    console.log(workoutValue);

    if (quantityExercise.length === 1) {
      setQuantity([
        {
          id: generator(),
        },
      ]);
    }
  };

  const weekHandler = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container w-full">
      <form className="bg-purple-100 shadow-md px-4 pt-2">
        <div className="grid grid-cols-4 gap-2">
          <label htmlFor="name">Workout plan name:</label>
          <input id="name" type="text" placeholder="" />
          <label htmlFor="description">Workout description:</label>
          <input id="description" type="text" placeholder="" />
          <label htmlFor="type">Workout type:</label>
          <input id="type" type="text" placeholder="" />
          <label htmlFor="numOfWeeks">Number of weeks:</label>
          <input
            id="numOfWeeks"
            type="number"
            placeholder="1"
            onChange={weekHandler}
            value={inputValue}
          />
          <label htmlFor="days">Number of workout days each week:</label>
          <input id="days" type="number" placeholder="1" />
        </div>

        <table className="table-auto">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>
                <button
                  className="bg-blue-200"
                  type="button"
                  onClick={addExercise}
                >
                  Add another exercise
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {quantityExercise.map((row) => {
              return (
                <tr key={row.id}>
                  <td>
                    <select
                      id={row.id}
                      className="form-select form-select-sm appearance-none block w-full px-2 text-md text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      aria-label="exercise"
                    >
                      {exerciseList.map((exercise) => {
                        return (
                          <option
                            id="option"
                            data-id={row.id}
                            name={exercise.name}
                            sets={exercise.sets}
                            reps={exercise.reps}
                            key={exercise._id}
                            value={exercise.name}
                          >
                            {exercise.name}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td>
                    <input id="sets" type="number" placeholder="1" />
                  </td>
                  <td>
                    <input id="reps" type="number" placeholder="1" />
                  </td>
                  <td>
                    <button
                      type="button"
                      data-id={row.id}
                      onClick={removeExercise}
                    >
                      Remove exercise
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <br></br>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Create workout
        </button>
      </form>
      <br></br>
    </div>
  );
};

export default CreateWorkout;
