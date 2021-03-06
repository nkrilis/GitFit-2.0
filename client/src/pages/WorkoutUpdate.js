import React, { useEffect, useState } from "react";
import { GET_EXERCISES, GET_WORKOUT_PLAN } from "../utils/queries";
import { UPDATE_WORKOUT_PLAN } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Navigate, Link } from "react-router-dom";
import Auth from "../utils/auth";
import decode from "jwt-decode";

const WorkoutUpdate = () => {
  const [updateWorkoutPlan] = useMutation(UPDATE_WORKOUT_PLAN);
  const { id: userParam } = useParams();

  const { data: dataExercise } = useQuery(GET_EXERCISES, {
    fetchPolicy: "no-cache",
  });
  const exerciseList = dataExercise?.getExercises || [];

  const { loading, data: dataWorkoutPlan } = useQuery(GET_WORKOUT_PLAN, {
    variables: { id: userParam },
    fetchPolicy: "no-cache",
  });
  const workoutPlan = dataWorkoutPlan?.getWorkoutPlan || [];

  const [weeks, setWeeks] = useState([
    {
      weekNumber: 1,
      days: [
        {
          dayOfWeek: "Monday",
          exercises: [
            {
              exerciseId: "1",
              userSets: 1,
              userReps: 1,
            },
          ],
        },
      ],
    },
    {
      weekNumber: 2,
      days: [
        {
          dayOfWeek: "Tuesday",
          exercises: [
            {
              exerciseId: "3",
              userSets: 3,
              userReps: 3,
            },
          ],
        },
      ],
    },
  ]);

  const [weekDisplay, setWeekDisplay] = useState(1);

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
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      },
    ],
  });
  const [day3, setDay3] = useState({
    dayOfWeek: "Wednesday",
    exercises: [
      {
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      },
    ],
  });
  const [day4, setDay4] = useState({
    dayOfWeek: "Thursday",
    exercises: [
      {
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      },
    ],
  });
  const [day5, setDay5] = useState({
    dayOfWeek: "Friday",
    exercises: [
      {
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      },
    ],
  });
  const [day6, setDay6] = useState({
    dayOfWeek: "Saturday",
    exercises: [
      {
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
      },
    ],
  });
  const [day7, setDay7] = useState({
    dayOfWeek: "Sunday",
    exercises: [
      {
        exerciseId: "1",
        userSets: 1,
        userReps: 1,
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

  // updates which add/remove day buttons to show and updates the week being displayed
  useEffect(() => {
    setDisplay1(true);
    setDisplay2(true);
    setDisplay3(true);
    setDisplay4(true);
    setDisplay5(true);
    setDisplay6(true);
    setDisplay7(true);
    setDay1({
      dayOfWeek: "Monday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });
    setDay2({
      dayOfWeek: "Tuesday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });
    setDay3({
      dayOfWeek: "Wednesday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });
    setDay4({
      dayOfWeek: "Thursday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });
    setDay5({
      dayOfWeek: "Friday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });
    setDay6({
      dayOfWeek: "Saturday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });
    setDay7({
      dayOfWeek: "Sunday",
      exercises: [
        {
          exerciseId: "1",
          userSets: 1,
          userReps: 1,
        },
      ],
    });

    if (!loading) {
      let arr = [];
      weeks[weekDisplay - 1].days.map((day) => {
        if (day.dayOfWeek === "Monday") {
          setDisplay1(false);
          setDay1(day);
          arr.push(day1);
        }
        if (day.dayOfWeek === "Tuesday") {
          setDisplay2(false);
          setDay2(day);
          arr.push(day2);
        }
        if (day.dayOfWeek === "Wednesday") {
          setDisplay3(false);
          setDay3(day);
          arr.push(day3);
        }
        if (day.dayOfWeek === "Thursday") {
          setDisplay4(false);
          setDay4(day);
          arr.push(day4);
        }
        if (day.dayOfWeek === "Friday") {
          setDisplay5(false);
          setDay5(day);
          arr.push(day5);
        }
        if (day.dayOfWeek === "Saturday") {
          setDisplay6(false);
          setDay6(day);
          arr.push(day6);
        }
        if (day.dayOfWeek === "Sunday") {
          setDisplay7(false);
          setDay7(day);
          arr.push(day7);
        }
      });
      setDays(arr);
    }
  }, [weeks, weekDisplay]);

  // updates the days being displayed with any changes are made to the days exercises
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
    });

    setDays(daysArray);
    daysArray = [];
  }, [day1, day2, day3, day4, day5, day6, day7]);

  // updates weeks state with the data from the query of the plan when loaded
  useEffect(() => {
    if (!loading) {
      let weekArr = [];

      workoutPlan.plan[0].weeks.map((week) => {
        let weekObj = {
          weekNumber: week.weekNumber,
          days: [
            ...week.days.map((day) => {
              return {
                dayOfWeek: day.dayOfWeek,
                exercises: [
                  ...day.exercises.map((exercise) => {
                    return {
                      exerciseId: exercise.exerciseId._id,
                      userSets: exercise.userSets,
                      userReps: exercise.userReps,
                    };
                  }),
                ],
              };
            }),
          ],
        };
        weekArr.push(weekObj);
      });
      setWeeks(weekArr);
    }
  }, [workoutPlan.plan]);

  if (!Auth.loggedIn()) {
    return <Navigate to="/login" />;
  }
  const decoded = decode(localStorage.getItem("id_token"));

  // function to create workout plan in database
  const planUpdate = async () => {
    let planVal = [...days];

    let weekVal = [
      ...weeks.map((week) => {
        if (week.weekNumber === weekDisplay) {
          return { weekNumber: weekDisplay, days: planVal };
        } else {
          return week;
        }
      }),
    ];

    const updateRes = await updateWorkoutPlan({
      variables: {
        id: userParam,
        ownerId: decoded.data._id,
        title: workoutPlan.title,
        description: workoutPlan.description,
        type: workoutPlan.type,
        numOfWeeks: parseInt(weeks.length),
        plan: [
          {
            weeks: weekVal,
          },
        ],
      },
    });

    if (updateRes.data.updateWorkoutPlan._id) {
      showResponse("Update Succesful");
    } else {
      showResponse("Unable to Update");
    }

    setWeeks(weekVal);
  };
  // function to show update successful response to user for period of 5 seconds
  const showResponse = (message) => {
    document.getElementById("update").innerHTML = message;

    setTimeout(function () {
      document.getElementById("update").innerHTML = "";
    }, 4000);
  };
  // Changing current week that is being updated
  const weekChange = (e) => {
    e.preventDefault();
    let newWeek = parseInt(e.target.value);
    setWeekDisplay(newWeek);
  };
  // function that adds a week to week array and updates state for weeks
  const addWeek = () => {
    let weekAddArr = [...weeks];

    weekAddArr.push({
      weekNumber: weekAddArr.length + 1,
      days: [
        {
          dayOfWeek: "Monday",
          exercises: [
            {
              exerciseId: "1",
              userSets: 1,
              userReps: 1,
            },
          ],
        },
      ],
    });
    setWeeks(weekAddArr);
  };
  // function that removes week from array and adjusts the week names, then updates state for weeks
  const removeWeek = () => {
    let weeksArr = [...weeks];
    let newVal = weeksArr.filter((y) => y.weekNumber !== weekDisplay);
    let num = 0;

    let newArr = [
      ...newVal.map((week) => {
        num++;
        return { weekNumber: num, days: week.days };
      }),
    ];

    if (newArr.length === 0) {
      newArr.push({
        weekNumber: 1,
        days: [
          {
            dayOfWeek: "Monday",
            exercises: [
              {
                exerciseId: "1",
                userSets: 1,
                userReps: 1,
              },
            ],
          },
        ],
      });
    }
    setWeeks(newArr);
    setWeekDisplay(1);
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

    if (x === 6) {
      if (daysVal.length <= 1) {
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
    setDays(daysVal);
  };
  // removes the day from state
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
    let newVal = daysVal.filter((y) => y.dayOfWeek !== day);

    setDays(newVal);
  };
  // adds exercise to day and updates state
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
      setDay1({ dayOfWeek: "Monday", exercises: exercisesVal });
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
      setDay7({ dayOfWeek: "Sunday", exercises: exercisesVal });
    }
  };
  // removes chosen exercise from day and updates state
  const removeExercise = (e) => {
    e.preventDefault();
    let exercisesVal = [];
    let x = parseInt(e.target.getAttribute("data-id"));
    let y = e.target.value;

    exercisesVal = [...day1.exercises];
    if (y === "Monday") {
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay1({ dayOfWeek: "Monday", exercises: exercisesVal });
      exercisesVal = [];
    }
    if (y === "Tuesday") {
      exercisesVal = [...day2.exercises];
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay2({ dayOfWeek: "Tuesday", exercises: exercisesVal });
    }
    if (y === "Wednesday") {
      exercisesVal = [...day3.exercises];
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay3({ dayOfWeek: "Wednesday", exercises: exercisesVal });
    }
    if (y === "Thursday") {
      exercisesVal = [...day4.exercises];
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay4({ dayOfWeek: "Thursday", exercises: exercisesVal });
    }
    if (y === "Friday") {
      exercisesVal = [...day5.exercises];
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay5({ dayOfWeek: "Friday", exercises: exercisesVal });
    }
    if (y === "Saturday") {
      exercisesVal = [...day6.exercises];
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay6({ dayOfWeek: "Saturday", exercises: exercisesVal });
    }
    if (y === "Sunday") {
      exercisesVal = [...day7.exercises];
      if (x === 0) {
        exercisesVal.shift();
      } else {
        exercisesVal.splice(x, 1);
      }
      if (exercisesVal.length === 0) {
        exercisesVal = [{ exerciseId: 1, userSets: 1, userReps: 1 }];
      }
      setDay7({ dayOfWeek: "Sunday", exercises: exercisesVal });
    }
  };
  // changes betweem add and remove options for each day
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
  // updating state for sets
  const setUserSets = (e) => {
    let x = parseInt(e.target.value);
    let y = e.target.id;
    let z = parseInt(e.target.name);
    let exerciseArr = [];
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
    if (y === "Saturday") {
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
  // updating state for reps
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
    if (y === "Saturday") {
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
  // updating state with exercise Id
  const setExercise = (e) => {
    let x = e.target.value;
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
      setDay2({ dayOfWeek: "Tuesday", exercises: exerciseArr });
    }
    if (y === "Wednesday") {
      exerciseArr = [...day3.exercises];
      exerciseArr[z].exerciseId = x;
      setDay3({ dayOfWeek: "Wednesday", exercises: exerciseArr });
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
    if (y === "Saturday") {
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

  return (
    <div>
      <h1 className="text-xl font-semi-bold text-purple-200 text-center">
        {" "}
        {workoutPlan.title}
      </h1>
      <br></br>
      <div className="flex justify-between pb-2">
        <button
          className="hover:font-bold bg-white rounded-lg p-1"
          onClick={addWeek}
        >
          Add another week
        </button>
        <Link
          className="bg-white rounded-lg p-1 hover:font-bold"
          to={`/workoutplan/${workoutPlan._id}`}
        >
          View plan page
        </Link>
      </div>

      <div className="grid grid-flow-col text-center mx-auto bg-purple-100 rounded-t-lg">
        <br></br>
        <div className="flex justify-between py-2">
          Edit Week
          {weeks.map((week, index) => {
            return (
              <button
                className="bg-purple-100 hover:font-bold rounded-full px-2 border-2"
                key={index}
                onClick={(e) => weekChange(e)}
                value={week.weekNumber}
              >
                {week.weekNumber}
              </button>
            );
          })}
        </div>
        <br></br>
      </div>
      <div key={weeks.weekNumber}>
        <h1 className=" text-xl text-center bg-purple-100 text-white py-2 underline">
          Week {weekDisplay}
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-7 md:grid-cols-7 lg:grid-cols-7 text-center bg-purple-100">
          <div className={`${isActive1 ? "f" : "hidden"}`}>
            <button
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100 no-underline"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-white hover:cursor-pointer hover:font-bold bg-purple-100"
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
              className="text-sm md:text-lg lg:text-xl hover:text-red-500 hover:cursor-pointer hover:font-bold bg-purple-100"
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
        <div className="bg-purple-100 shadow-md px-2 py-2">
          {days.map((day) => {
            return (
              <div key={day.dayOfWeek} name={`exercise${day.dayOfWeek}`}>
                <div>
                  <h1>Day: {day.dayOfWeek} </h1>
                  <button
                    className="text-white bg-purple-200 hover:bg-purple-100"
                    onClick={(e) => addExercise(e)}
                    value={day.dayOfWeek}
                  >
                    Add another exercise
                  </button>
                </div>
                {day.exercises.map((exercise, index) => {
                  if (index === 0) {
                    return (
                      <div key={index}>
                        <div className="grid grid-cols-5 gap-2 pb-1">
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
                            className="text-center"
                            name={index}
                            id={day.dayOfWeek}
                            type="number"
                            min="1"
                            max="50"
                            onChange={setUserSets}
                            value={exercise.userSets}
                          />

                          <input
                            className="text-center"
                            name={index}
                            id={day.dayOfWeek}
                            type="number"
                            min="1"
                            max="50"
                            onChange={setUserReps}
                            value={exercise.userReps}
                          />

                          {/* <textarea
                          className="col-span-2"
                          name="description"
                          type="text"
                          defaultValue={""}
                        ></textarea> */}
                          {/* Future implementation to allow user to add a specific detail or description for doing exercise in their workout */}

                          <button
                            className="text-sm md:text-lg lg:text-xl hover:text-white bg-purple-200 hover:cursor-pointer hover:font-bold rounded-lg"
                            data-id={index}
                            value={day.dayOfWeek}
                            onClick={(e) => removeExercise(e)}
                          >
                            Delete Exercise
                          </button>
                        </div>
                      </div>
                    );
                  } else
                    return (
                      <div key={index}>
                        <div className="grid grid-cols-5 gap-2 pb-1">
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
                            className="border-t-2 border-black text-center"
                            name={index}
                            id={day.dayOfWeek}
                            type="number"
                            min="1"
                            max="50"
                            onChange={setUserSets}
                            value={exercise.userSets}
                          />

                          <input
                            className="border-t-2 border-black text-center"
                            name={index}
                            id={day.dayOfWeek}
                            type="number"
                            min="1"
                            max="50"
                            onChange={setUserReps}
                            value={exercise.userReps}
                          />

                          {/* <textarea
                          className="col-span-2"
                          name="description"
                          type="text"
                          defaultValue={""}
                        ></textarea> */}
                          {/* Future implementation to allow user to add a specific detail or description for doing exercise in their workout */}

                          <button
                            className="text-sm md:text-lg lg:text-xl hover:text-white bg-purple-200 hover:cursor-pointer hover:font-bold rounded-lg"
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
        </div>
        <div className="grid grid-flow-col text-center mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-b-lg focus:outline-none focus:shadow-outline"
            type="button"
            onClick={planUpdate}
          >
            Update week {weekDisplay}
          </button>
          <button
            className="text-sm md:text-lg lg:text-xl bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-b-lg focus:outline-none focus:shadow-outline"
            onClick={removeWeek}
          >
            Remove week
          </button>
        </div>
        <br></br>
        <p id="update" className="text-xl text-center text-white pb-4"></p>
      </div>
    </div>
  );
};

export default WorkoutUpdate;
