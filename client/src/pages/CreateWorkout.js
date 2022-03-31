import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_EXERCISES } from "../utils/queries";

const CreateWorkout = () => {
  const { loading, data } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });

  const exerciseList = data?.getExercises || [];
  console.log(exerciseList);

  return (
    <div className="container w-full">
      <form className="bg-sky-400 shadow-md px-4 pt-2">
        <div className="grid grid-cols-4 gap-2">
          <label className="bg-teal-300" htmlFor="name">
            Workout plan name:
          </label>
          <input
            className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder=""
          />
          <label className="bg-teal-300" htmlFor="description">
            Workout description:
          </label>
          <input
            className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline"
            id="description"
            type="text"
            placeholder=""
          />
          <label className="bg-teal-300" htmlFor="type">
            Workout type:
          </label>
          <input
            className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline"
            id="type"
            type="text"
            placeholder=""
          />
          <label className="bg-teal-300" htmlFor="numOfWeeks">
            Number of weeks:
          </label>
          <input
            className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline"
            id="numOfWeeks"
            type="number"
            placeholder="1"
          />
          <label className="bg-teal-300" htmlFor="days">
            Number of workout days each week:
          </label>
          <input
            className="shadow appearance-none border rounded focus:outline-none focus:shadow-outline"
            id="days"
            type="number"
            placeholder="1"
          />
        </div>

        <table className="table-auto">
          <thead>
            <tr>
              <th>Exercise</th>
              <th>Sets</th>
              <th>Reps</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <select
                  className="form-select form-select-sm appearance-none block w-full px-2 text-md text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  aria-label="exercise"
                >
                  {exerciseList.map((exercise) => {
                    return (
                      <option value={exercise._id} key={exercise._id}>
                        {exercise.name}
                      </option>
                    );
                  })}
                </select>
              </td>
              <td>
                <input
                  className=""
                  id="sets"
                  type="number"
                  placeholder="1"
                ></input>
              </td>
              <td>
                <input
                  className=""
                  id="reps"
                  type="number"
                  placeholder="1"
                ></input>
              </td>
            </tr>
          </tbody>
        </table>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Create workout
        </button>
      </form>
    </div>
  );
};

export default CreateWorkout;

// GiShoulderArmor
// GiMuscularTorso
// GiAbdominalArmor
// GiLeg
// GiBiceps
