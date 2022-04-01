import { gql } from "@apollo/client";

// export const GET_USER = gql`
//   query getUser($_id: String!) {
//     getUser(_id: $_id) {
//       _id
//       firstName
//       lastName
//       email
//       password
//     }
//   }
// `;

// export const GET_USERS = gql`
//   query getUsers {
//     getUsers {
//       _id
//       firstName
//       lastName
//       #   email - should we include?
//     }
//   }
// `;

// export const GET_WORKOUT_PLAN = gql`
//   query getWorkoutPlan($_id:) {
//       getWorkoutPlan(_id: $_id) {
//         _id
//       title
//       description
//       type
//       numOfWeeks
//       plan {
//         weeks {
//           days {
//             exercise {
//               _id
//               name
//               description
//               sets
//               reps
//               muscleGroup
//             }
//           }
//         }
//       }
//     }
//   }
// `;

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
