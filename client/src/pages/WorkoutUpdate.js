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
    variables: { id: "new" },
    fetchPolicy: "no-cache",
  });
  const workoutPlan = dataWorkoutPlan?.getWorkoutPlan || [];

  console.log(workoutPlan);

  const [updateWorkoutPlan] = useMutation(UPDATE_WORKOUT_PLAN);

  const [weeks, setWeeks] = useState([]);
  const [day1, setDay1] = useState({
    dayOfWeek: "Monday",
    exercises: [
      {
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      },
    ],
  });
  const [day2, setDay2] = useState({
    dayOfWeek: "Tuesday",
    exercises: [
      {
        exerciseId: "2",
        userSets: 2,
        userReps: 2,
      },
    ],
  });
  const [day3, setDay3] = useState({
    dayOfWeek: "Wednesday",
    exercises: [
      {
        exerciseId: "3",
        userSets: 3,
        userReps: 3,
      },
    ],
  });
  const [day4, setDay4] = useState({
    dayOfWeek: "Thursday",
    exercises: [
      {
        exerciseId: "4",
        userSets: 4,
        userReps: 4,
      },
    ],
  });
  const [day5, setDay5] = useState({
    dayOfWeek: "Friday",
    exercises: [
      {
        exerciseId: "5",
        userSets: 5,
        userReps: 5,
      },
    ],
  });
  const [day6, setDay6] = useState({
    dayOfWeek: "Saturday",
    exercises: [
      {
        exerciseId: "6",
        userSets: 6,
        userReps: 6,
      },
    ],
  });
  const [day7, setDay7] = useState({
    dayOfWeek: "Sunday",
    exercises: [
      {
        exerciseId: "7",
        userSets: 7,
        userReps: 7,
      },
    ],
  });
  const [days, setDays] = useState([]);

  const [isActive1, setDisplay1] = useState("false");
  const [isActive2, setDisplay2] = useState("false");
  const [isActive3, setDisplay3] = useState("false");
  const [isActive4, setDisplay4] = useState("false");
  const [isActive5, setDisplay5] = useState("false");
  const [isActive6, setDisplay6] = useState("false");
  const [isActive7, setDisplay7] = useState("false");

  const exerciseForm = useRef(null);

  // function to create workout plan in database
  const planUpdate = async () => {
    console.log(workoutPlan.plan[0].weeks[0].days);
    console.log(day1);
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

    array.push(data.getAll("setsMonday1"));
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

  //Checking which day is being added and where to add into the array then updating state
  const addDay = (e) => {
    e.preventDefault();
    let x = parseInt(e.target.value);
    let daysVal = [];
    daysVal = [...days];

    if (x === 1) {
      daysVal.unshift(day1);
    }

    if (x === 2) {
      daysVal.some((day) => day.dayOfWeek === "Monday")
        ? daysVal.splice(1, 0, day2)
        : daysVal.unshift(day2);
    }

    if (x === 3) {
      if (daysVal.length <= 1) {
        daysVal.some(
          (day) => day.dayOfWeek === "Monday" || day.dayOfWeek === "Tuesday"
        )
          ? daysVal.push(day3)
          : daysVal.unshift(day3);
      } else if (daysVal.length >= 2) {
        if (
          daysVal.some((day) => day.dayOfWeek === "Monday") &&
          daysVal.some((day) => day.dayOfWeek === "Tuesday")
        ) {
          daysVal.splice(2, 0, day3);
        } else if (
          daysVal.some(
            (day) => day.dayOfWeek === "Monday" || day.dayOfWeek === "Tuesday"
          )
        ) {
          daysVal.splice(1, 0, day3);
        } else {
          daysVal.unshift(day3);
        }
      }
    }

    if (x === 4) {
      if (daysVal.length <= 1) {
        daysVal.some(
          (day) =>
            day.dayOfWeek === "Monday" ||
            day.dayOfWeek === "Tuesday" ||
            day.dayOfWeek === "Wednesday"
        )
          ? daysVal.push(day4)
          : daysVal.unshift(day4);
      } else if (daysVal.length === 2) {
        daysVal.some(
          (day) =>
            day.dayOfWeek === ("Monday" && "Tuesday") ||
            day.dayOfWeek === ("Monday" && "Wedesday") ||
            day.dayOfWeek === ("Tuesday" && "Wednesday")
        )
          ? daysVal.push(day4)
          : daysVal.unshift(day4);
      } else if (daysVal.length >= 3) {
        if (
          daysVal.some((day) => day.dayOfWeek === "Monday") &&
          daysVal.some((day) => day.dayOfWeek === "Tuesday") &&
          daysVal.some((day) => day.dayOfWeek === "Wednesday")
        ) {
          daysVal.splice(3, 0, day4);
        } else if (
          daysVal.some(
            (day) =>
              day.dayOfWeek === ("Monday" && "Tuesday") ||
              day.dayOfWeek === ("Monday" && "Wedesday") ||
              day.dayOfWeek === ("Tuesday" && "Wednesday")
          )
        ) {
          daysVal.splice(2, 0, day4);
        } else if (
          daysVal.some(
            (day) =>
              day.dayOfWeek === "Monday" ||
              day.dayOfWeek === "Tuesday" ||
              day.dayOfWeek === "Wednesday"
          )
        ) {
          daysVal.splice(1, 0, day4);
        } else {
          daysVal.unshift(day4);
        }
      }
    }

    if (x === 5) {
      if (daysVal.length <= 1) {
        daysVal.some(
          (day) =>
            day.dayOfWeek === "Monday" ||
            day.dayOfWeek === "Tuesday" ||
            day.dayOfWeek === "Wednesday" ||
            day.dayOfWeek === "Thursday"
        )
          ? daysVal.push(day5)
          : daysVal.unshift(day5);
      } else if (daysVal.length === 2) {
        daysVal.some(
          (day) =>
            day.dayOfWeek === ("Monday" && "Tuesday") ||
            day.dayOfWeek === ("Monday" && "Wedesday") ||
            day.dayOfWeek === ("Monday" && "Thursday") ||
            day.dayOfWeek === ("Tuesday" && "Wednesday") ||
            day.dayOfWeek === ("Tuesday" && "Thursday") ||
            day.dayOfWeek === ("Wednesday" && "Thursday")
        )
          ? daysVal.push(day5)
          : daysVal.unshift(day5);
      } else if (daysVal.length === 3) {
        daysVal.some(
          (day) =>
            day.dayOfWeek === ("Monday" && "Tuesday" && "Wednesday") ||
            day.dayOfWeek === ("Monday" && "Wedesday" && "Thursday") ||
            day.dayOfWeek === ("Monday" && "Tuesday" && "Thursday") ||
            day.dayOfWeek === ("Tuesday" && "Wednesday" && "Thursday")
        )
          ? daysVal.push(day5)
          : daysVal.unshift(day5);
      } else if (daysVal.length >= 4) {
        if (
          daysVal.some((day) => day.dayOfWeek === "Monday") &&
          daysVal.some((day) => day.dayOfWeek === "Tuesday") &&
          daysVal.some((day) => day.dayOfWeek === "Wednesday") &&
          daysVal.some((day) => day.dayOfWeek === "Thursday")
        ) {
          daysVal.splice(4, 0, day5);
        } else if (
          daysVal.some(
            (day) =>
              day.dayOfWeek === ("Monday" && "Tuesday" && "Wednesday") ||
              day.dayOfWeek === ("Monday" && "Tuesday" && "Thursday") ||
              day.dayOfWeek === ("Monday" && "Wednesday" && "Thursday") ||
              day.dayOfWeek === ("Tuesday" && "Wednesday" && "Thursday")
          )
        ) {
          daysVal.splice(3, 0, day5);
        } else if (
          daysVal.some(
            (day) =>
              day.dayOfWeek === ("Monday" && "Tuesday") ||
              day.dayOfWeek === ("Monday" && "Wednesday") ||
              day.dayOfWeek === ("Monday" && "Thursday") ||
              day.dayOfWeek === ("Tuesday" && "Wednesday") ||
              day.dayOfWeek === ("Tuesday" && "Thursday") ||
              day.dayOfWeek === ("Wednesday" && "Thursday")
          )
        ) {
          daysVal.splice(2, 0, day5);
        } else if (
          (day) =>
            day.dayOfWeek === "Monday" ||
            day.dayOfWeek === "Tuesday" ||
            day.dayOfWeek === "Wednesday" ||
            day.dayOfWeek === "Thursday"
        ) {
          daysVal.splice(1, 0, day5);
        } else {
          daysVal.unshift(day5);
        }
      }
    }
    console.log(day5);

    if (x === 6) {
      if (daysVal.length === 1) {
        daysVal.some((day) => day.dayOfWeek === "Sunday")
          ? daysVal.unshift(day6)
          : daysVal.push(day6);
      } else if (daysVal.length === 2) {
        daysVal.some((day) => day.dayOfWeek === "Sunday")
          ? daysVal.splice(1, 0, day6)
          : daysVal.push(day6);
      } else if (daysVal.length === 3) {
        daysVal.some((day) => day.dayOfWeek === "Sunday")
          ? daysVal.splice(2, 0, day6)
          : daysVal.push(day6);
      } else if (daysVal.length === 4) {
        daysVal.some((day) => day.dayOfWeek === "Sunday")
          ? daysVal.splice(3, 0, day6)
          : daysVal.push(day6);
      } else if (daysVal.length === 5) {
        daysVal.some((day) => day.dayOfWeek === "Sunday")
          ? daysVal.splice(4, 0, day6)
          : daysVal.push(day6);
      } else if (daysVal.length === 6) {
        daysVal.splice(5, 0, day6);
      }
    }

    if (x === 7) {
      daysVal.push(day7);
    }
    console.log(daysVal);
    setDays(daysVal);
  };

  const removeDay = (e) => {
    e.preventDefault();
    let x = parseInt(e.target.value);
    let daysVal = [];
    let day = "";

    switch (x) {
      case 1:
        day = "Monday";
        break;
      case 2:
        day = "Tuesday";
        break;
      case 3:
        day = "Wednesday";
        break;
      case 4:
        day = "Thursday";
        break;
      case 5:
        day = "Friday";
        break;
      case 6:
        day = "Saturday";
        break;
      case 7:
        day = "Sunday";
        break;
      default:
        day = "error";
    }

    daysVal = [...days];
    let newVal = daysVal.filter((y) => y.day !== day);

    setDays(newVal);
  };

  const addExercise = (e) => {
    e.preventDefault();
    let x = e.target.value;

    let exercisesVal = [];

    if (x === "Monday") {
      exercisesVal = [...day1.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      console.log(exercisesVal);
      console.log(day1);
      setDay1({ dayOfWeek: "Monday", exercises: exercisesVal });
      exercisesVal = [];
    }
    if (x === "Tuesday") {
      exercisesVal = [...day2.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      setDay2({ dayOfWeek: "Tuesday", exercises: exercisesVal });
    }
    if (x === "Wednesday") {
      exercisesVal = [...day3.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      setDay3({ dayOfWeek: "Wednesday", exercises: exercisesVal });
    }
    if (x === "Thursday") {
      exercisesVal = [...day4.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      setDay4({ dayOfWeek: "Thursday", exercises: exercisesVal });
    }
    if (x === "Friday") {
      exercisesVal = [...day5.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      setDay5({ dayOfWeek: "Friday", exercises: exercisesVal });
    }
    if (x === "Saturday") {
      exercisesVal = [...day6.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      setDay6({ dayOfWeek: "Saturday", exercises: exercisesVal });
    }
    if (x === "Sunday") {
      exercisesVal = [...day7.exercises];
      exercisesVal.push({
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      });
      setDay7({ dayOfWeeky: "Sunday", exercises: exercisesVal });
    }
  };

  const removeExercise = (e) => {
    e.preventDefault();
    let exercisesVal = [];
    let x = parseInt(e.target.getAttribute("data-id"));
    let y = e.target.value;

    console.log(x, y);
    exercisesVal = [...day1.exercises];
    if (y === "Monday") {
      if (x === 0) {
        exercisesVal.shift();
      } else {
        console.log(exercisesVal);
        exercisesVal.splice(x, 1);
        console.log(exercisesVal);
      }
      setDay1({ dayOfWeek: "Monday", exercises: exercisesVal });
      exercisesVal = [];
    }
    if (y === "Tuesday") {
      exercisesVal = [...day2.exercises];
      let newVal = exercisesVal.filter((exercise) => exercise !== x);
      setDay2({ dayOfWeek: "Tuesday", exercises: newVal });
    }
    if (y === "Wednesday") {
      exercisesVal = [...day3.exercises];
      let newVal = exercisesVal.filter((exercise) => exercise !== x);
      setDay3({ dayOfWeek: "Wednesday", exercises: newVal });
    }
    if (y === "Thursday") {
      exercisesVal = [...day4.exercises];
      let newVal = exercisesVal.filter((exercise) => exercise !== x);
      setDay4({ dayOfWeek: "Thursday", exercises: newVal });
    }
    if (y === "Friday") {
      exercisesVal = [...day5.exercises];
      let newVal = exercisesVal.filter((exercise) => exercise !== x);
      setDay5({ dayOfWeek: "Friday", exercises: newVal });
    }
    if (y === "Saturday") {
      exercisesVal = [...day6.exercises];
      let newVal = exercisesVal.filter((exercise) => exercise !== x);
      setDay6({ dayOfWeek: "Saturday", exercises: newVal });
    }
    if (y === "Sunday") {
      exercisesVal = [...day7.exercises];
      let newVal = exercisesVal.filter((exercise) => exercise !== x);
      setDay7({ dayOfWeek: "Sunday", exercises: newVal });
    }
  };

  const toggleDisplay = (e) => {
    e.preventDefault();
    let x = parseInt(e.target.value);

    if (x === 1) {
      setDisplay1(!isActive1);
    }
    if (x === 2) {
      setDisplay2(!isActive2);
    }
    if (x === 3) {
      setDisplay3(!isActive3);
    }
    if (x === 4) {
      setDisplay4(!isActive4);
    }
    if (x === 5) {
      setDisplay5(!isActive5);
    }
    if (x === 6) {
      setDisplay6(!isActive6);
    }
    if (x === 7) {
      setDisplay7(!isActive7);
    }
  };

  const setUserSets = (e) => {
    let x = parseInt(e.target.value);
    let y = e.target.id;
    let z = parseInt(e.target.name);
    let exerciseArr = [];
    console.log(x, y, x);
    if (y === "Monday") {
      exerciseArr = [...day1.exercises];
      exerciseArr[z].userSets = x;
      setDay1({ dayOfWeek: "Monday", exercises: exerciseArr });
    }
    if (y === "Tuesday") {
      exerciseArr = [...day2.exercises];
      exerciseArr[z].userSets = x;
      setDay2({ dayOfWeek: "Tuesday", exercises: exerciseArr });
    }
    if (y === "Wednesday") {
      exerciseArr = [...day3.exercises];
      exerciseArr[z].userSets = x;
      setDay3({ dayOfWeek: "Wednesday", exercises: exerciseArr });
    }
    if (y === "Thursday") {
      exerciseArr = [...day4.exercises];
      exerciseArr[z].userSets = x;
      setDay4({ dayOfWeek: "Thursday", exercises: exerciseArr });
    }
    if (y === "Friday") {
      exerciseArr = [...day5.exercises];
      exerciseArr[z].userSets = x;
      setDay5({ dayOfWeek: "Friday", exercises: exerciseArr });
    }
    if (y === "Satuday") {
      exerciseArr = [...day6.exercises];
      exerciseArr[z].userSets = x;
      setDay6({ dayOfWeek: "Saturday", exercises: exerciseArr });
    }
    if (y === "Sunday") {
      exerciseArr = [...day7.exercises];
      exerciseArr[z].userSets = x;
      setDay7({ dayOfWeek: "Sunday", exercises: exerciseArr });
    }
  };

  const setUserReps = (e) => {
    let x = parseInt(e.target.value);
    let y = e.target.id;
    let z = parseInt(e.target.name);
    let exerciseArr = [];

    if (y === "Monday") {
      exerciseArr = [...day1.exercises];
      exerciseArr[z].userReps = x;
      setDay1({ dayOfWeek: "Monday", exercises: exerciseArr });
    }
    if (y === "Tuesday") {
      exerciseArr = [...day2.exercises];
      exerciseArr[z].userReps = x;
      setDay2({ dayOfWeek: "Tuesday", exercises: exerciseArr });
    }
    if (y === "Wednesday") {
      exerciseArr = [...day3.exercises];
      exerciseArr[z].userReps = x;
      setDay3({ dayOfWeek: "Wednesday", exercises: exerciseArr });
    }
    if (y === "Thursday") {
      exerciseArr = [...day4.exercises];
      exerciseArr[z].userReps = x;
      setDay4({ dayOfWeek: "Thursday", exercises: exerciseArr });
    }
    if (y === "Friday") {
      exerciseArr = [...day5.exercises];
      exerciseArr[z].userReps = x;
      setDay5({ dayOfWeek: "Friday", exercises: exerciseArr });
    }
    if (y === "Satuday") {
      exerciseArr = [...day6.exercises];
      exerciseArr[z].userReps = x;
      setDay6({ dayOfWeek: "Saturday", exercises: exerciseArr });
    }
    if (y === "Sunday") {
      exerciseArr = [...day7.exercises];
      exerciseArr[z].userReps = x;
      setDay7({ dayOfWeek: "Sunday", exercises: exerciseArr });
    }
  };

  const setExercise = (e) => {
    let x = parseInt(e.target.value);
    console.log(x);
    let y = e.target.id;
    let z = parseInt(e.target.name);
    let exerciseArr = [];

    if (y === "Monday") {
      exerciseArr = [...day1.exercises];
      exerciseArr[z].exerciseId = x;
      setDay1({ dayOfWeek: "Monday", exercises: exerciseArr });
    }
    if (y === "Tuesday") {
      exerciseArr = [...day2.exercises];
      exerciseArr[z].exerciseId = x;
      setDay2({ dayOfWeeky: "Tuesday", exercises: exerciseArr });
    }
    if (y === "Wednesday") {
      exerciseArr = [...day3.exercises];
      exerciseArr[z].exerciseId = x;
      setDay3({ dayOfWeeky: "Wednesday", exercises: exerciseArr });
    }
    if (y === "Thursday") {
      exerciseArr = [...day4.exercises];
      exerciseArr[z].exerciseId = x;
      setDay4({ dayOfWeek: "Thursday", exercises: exerciseArr });
    }
    if (y === "Friday") {
      exerciseArr = [...day5.exercises];
      exerciseArr[z].exerciseId = x;
      setDay5({ dayOfWeek: "Friday", exercises: exerciseArr });
    }
    if (y === "Satuday") {
      exerciseArr = [...day6.exercises];
      exerciseArr[z].exerciseId = x;
      setDay6({ dayOfWeek: "Saturday", exercises: exerciseArr });
    }
    if (y === "Sunday") {
      exerciseArr = [...day7.exercises];
      exerciseArr[z].exerciseId = x;
      setDay7({ dayOfWeek: "Sunday", exercises: exerciseArr });
    }
  };

  useEffect(() => {
    workoutWeeks();

    // if (!loading) {
    //   workoutPlan.plan[0].weeks[0].days.map((day) => {
    //     if (day.dayOfWeek === "Monday") {
    //       let arr = []
    //       setDay1({day:arr);
    //     }
    //     if (day.dayOfWeek === "Tuesday") {
    //       setDay2(day);
    //     }
    //     if (day.dayOfWeek === "Wednesday") {
    //       setDay3(day);
    //     }
    //     if (day.dayOfWeek === "Thursday") {
    //       setDay4(day);
    //     }
    //     if (day.dayOfWeek === "Friday") {
    //       setDay5(day);
    //     }
    //     if (day.dayOfWeek === "Saturday") {
    //       setDay6(day);
    //     }
    //     if (day.dayOfWeek === "Sunday") {
    //       setDay7(day);
    //     }
    //     console.log(day1);
    //   });
    // }
  }, [workoutPlan.plan]);

  useEffect(() => {
    let daysArray = [];
    let daysVal = [...days];

    daysVal.map((day) => {
      if (day.dayOfWeek === "Monday") {
        daysArray.push(day1);
      }
      if (day.dayOfWeek === "Tuesday") {
        daysArray.push(day2);
      }
      if (day.dayOfWeek === "Wednesday") {
        daysArray.push(day3);
      }
      if (day.dayOfWeek === "Thursday") {
        daysArray.push(day4);
      }
      if (day.dayOfWeek === "Friday") {
        daysArray.push(day5);
      }
      if (day.dayOfWeek === "Saturday") {
        daysArray.push(day6);
      }
      if (day.dayOfWeek === "Sunday") {
        daysArray.push(day7);
      }
      console.log(days);
    });

    setDays(daysArray);
    daysArray = [];
  }, [day1, day2, day3, day4, day5, day6, day7]);

  return (
    <div>
      {weeks.map((week) => {
        return (
          <div key={week}>
            <div className="grid grid-cols-7">
              <h1 className="col-span-6">Week:{week}</h1>
              Workout Days - Click to add
              <div className={`${isActive1 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="1"
                >
                  Add Monday
                </button>
              </div>
              <div className={`${isActive1 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="1"
                >
                  Remove Monday
                </button>
              </div>
              <div className={`${isActive2 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="2"
                >
                  Add Tuesday
                </button>
              </div>
              <div className={`${isActive2 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="2"
                >
                  Remove Tuesday
                </button>
              </div>
              <div className={`${isActive3 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="3"
                >
                  Add Wednesday
                </button>
              </div>
              <div className={`${isActive3 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="3"
                >
                  Remove Wednesday
                </button>
              </div>
              <div className={`${isActive4 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="4"
                >
                  Add Thursday
                </button>
              </div>
              <div className={`${isActive4 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="4"
                >
                  Remove Thursday
                </button>
              </div>
              <div className={`${isActive5 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="5"
                >
                  Add Friday
                </button>
              </div>
              <div className={`${isActive5 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="5"
                >
                  Remove Friday
                </button>
              </div>
              <div className={`${isActive6 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="6"
                >
                  Add Saturday
                </button>
              </div>
              <div className={`${isActive6 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="6"
                >
                  Remove Saturday
                </button>
              </div>
              <div className={`${isActive7 ? "f" : "hidden"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    addDay(e);
                  }}
                  value="7"
                >
                  Add Sunday
                </button>
              </div>
              <div className={`${isActive7 ? "hidden" : "f"}`}>
                <button
                  className="font-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
                  onClick={(e) => {
                    toggleDisplay(e);
                    removeDay(e);
                  }}
                  value="7"
                >
                  Remove Sunday
                </button>
              </div>
            </div>
            <form
              ref={exerciseForm}
              onSubmit={formSubmit}
              className="bg-purple-100 shadow-md px-2 py-2"
            >
              {days.map((day) => {
                return (
                  <div
                    key={week + day.dayOfWeek}
                    name={`exercise${day.dayOfWeek}`}
                  >
                    <h1>Day: {day.dayOfWeek} </h1>
                    <button
                      className="text-white bg-purple-200 hover:bg-purple-100"
                      onClick={(e) => addExercise(e)}
                      value={day.dayOfWeek}
                    >
                      Add another exercise
                    </button>
                    {day.exercises.map((exercise, index) => {
                      return (
                        <div key={index}>
                          <div className="grid grid-cols-7 gap-2">
                            <select
                              id={day.dayOfWeek}
                              name={index}
                              className="col-span-2 form-select form-select-sm appearance-none block w-full px-2 text-md text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              aria-label="exercise"
                              onChange={setExercise}
                              value={exercise.exerciseId}
                            >
                              {exerciseList.map((exerciseL) => {
                                return (
                                  <option
                                    key={exerciseL._id}
                                    value={exerciseL._id}
                                  >
                                    {exerciseL.name}
                                  </option>
                                );
                              })}
                            </select>
                            <input
                              name={index}
                              id={day.dayOfWeek}
                              type="number"
                              min="1"
                              max="50"
                              onChange={setUserSets}
                              value={exercise.userSets}
                            />

                            <input
                              name={index}
                              id={day.dayOfWeek}
                              type="number"
                              min="1"
                              max="50"
                              onChange={setUserReps}
                              value={exercise.userReps}
                            />

                            <textarea
                              className="col-span-2"
                              name="description"
                              type="text"
                              defaultValue={""}
                            ></textarea>

                            <button
                              className="font-xl hover:text-white bg-purple-200 hover:cursor-pointer hover:font-bold"
                              data-id={index}
                              value={day.dayOfWeek}
                              onClick={(e) => removeExercise(e)}
                            >
                              Delete Exercise
                            </button>
                          </div>
                        </div>
                      );
                    })}
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
