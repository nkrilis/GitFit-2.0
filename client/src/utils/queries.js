import { gql } from "@apollo/client";

// Get user by username
export const QUERY_USER = gql`
query User($username: String!) {
  user(username: $username) {
    _id
    username
    email
    workoutPlan {
        _id
        title
        description
        type
        numOfWeeks
        plan {
          weeks {
            weekNumber
            days {
              dayOfWeek
              exercises {
                _id
                description
                name
                reps
                sets
                muscleGroup
              }
            }
          }
        }
      }
    }
  }
`;

// Get logged in user
export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      workoutPlan {
        _id
        title
        description
        type
        numOfWeeks
        plan {
          weeks {
            weekNumber
            days {
              dayOfWeek
              exercises {
                _id
                description
                name
                reps
                sets
                muscleGroup
              }
            }
          }
        }
      }
    }
  }
`;

// Get all exercises
export const GET_EXERCISES = gql`
  query GetExercises {
    getExercises {
      _id
      name
      description
      sets
      reps
      muscleGroup
    }
  }
`;

// Get exercise by id
export const GET_EXERCISE = gql`
  query GetExercise($_id: ID!) {
    getExercise(_id: $_id) {
      _id
      name
      description
      sets
      reps
      muscleGroup
      video
    }
  }
`;

// Get all Workout Plans
export const GET_WORKOUT_PLANS = gql`
  query GetWorkoutPlans {
    getWorkoutPlans {
      _id
      title
      description
      type
      numOfWeeks
      plan {
        weeks {
          weekNumber
          days {
            dayOfWeek
            exercises {
              _id
              description
              name
              reps
              sets
              muscleGroup
            }
          }
        }
      }
    }
  }
`;

// Get workout Plan by id
export const GET_WORKOUT_PLAN = gql`
  query GetWorkoutPlan($_id: ID!) {
    getWorkoutPlan(_id: $_id) {
      _id
      title
      description
      type
      numOfWeeks
      plan {
        weeks {
          weekNumber
          days {
            dayOfWeek
            exercises {
              _id
              description
              name
              reps
              sets
              muscleGroup
            }
          }
        }
      }
    }
  }
`;
