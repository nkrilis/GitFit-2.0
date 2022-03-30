import React from "react";
import { Link } from "react-router-dom";

import testImage from "../assets/images/proj2.png";

const Workout = () => {
  return (
    <container className="flex-col justify-center items-center bg-teal-300">
      <div className="mt-4 grid lg:grid-cols-3 gap-5">
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <Link to="/Exercise">
              <div className="font-bold">Workout X</div>
            </Link>
            <div className="md:flex justify-center">
              <div classNme="text-md">Sets: 3</div>
              <div className="text-md">Reps: 12</div>
            </div>
          </div>
        </div>
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">Workout X</div>
            <div className="flex-1">
              <div classNme="text-md">Sets: 3</div>
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
            <div className="font-bold">Workout X</div>
            <div classNme="text-md">Sets: 3</div>
            <div className="text-md">Reps: 12</div>
          </div>
        </div>
      </div>

      <div className="border-t-4"></div>

      <div className="mt-4 grid lg:grid-cols-3 gap-5">
        <div className="card">
          <img
            src={testImage}
            alt="benchpress"
            className="w-full h-44 object-cover"
          />
          <div className="m-2">
            <div className="font-bold">Workout X</div>
            <div classNme="text-md">Sets: 3</div>
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
            <div className="font-bold">Workout X</div>
            <div classNme="text-md">Sets: 3</div>
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
            <div className="font-bold">Workout X</div>
            <div classNme="text-md">Sets: 3</div>
            <div className="text-md">Reps: 12</div>
          </div>
        </div>
      </div>
    </container>
  );
};

export default Workout;
