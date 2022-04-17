import { gql } from "@apollo/client";

// Get user by username
export const QUERY_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      _id
      username
      email
      password
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
                exerciseId {
                  _id
                  name
                  description
                  muscleGroup
                  video
                }
                userSets
                userReps
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
      password
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
                exerciseId {
                  _id
                  name
                  description
                  muscleGroup
                  video
                }
                userSets
                userReps
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
      muscleGroup
      video
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
              exerciseId {
                _id
                name
                description
                muscleGroup
                video
              }
              userSets
              userReps
            }
          }
        }
      }
    }
  }
`;

// Get workout Plan by id
export const GET_WORKOUT_PLAN = gql`
  query GetWorkoutPlan($id: ID!) {
    getWorkoutPlan(_id: $id) {
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
              exerciseId {
                _id
                name
              }
              userSets
              userReps
            }
          }
        }
      }
    }
  }
`;
