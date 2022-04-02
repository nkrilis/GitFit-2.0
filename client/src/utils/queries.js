import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
      }
    }
  }
`;

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

export const GET_EXERCISE = gql`
  query getExercise($_id: String) {
    getExercise(_id: $_id) {
      _id
      name
      description
      sets
      reps
      muscleGroup
    }
  }
`;
