import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      _id
      firstName
      lastName
      email
      password
    }
  }
`;

export const CREATE_WORKOUT_PLAN = gql`
  mutation createWorkoutPlan(
    $title: String!
    $description: String!
    $type: String!
    $numOfWeeks: Int!
    $plan: plan!
  ) {
    createWorkoutPlan(
      title: $title
      description: $description
      type: $type
      numOfWeeks: $numOfWeeks
      plan: $plan
    ) {
      _id
      title
      description
      type
      numOfWeeks
      plan
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation createExercise(
    $name: String!
    $description: String!
    $sets: Int!
    $reps: Int!
    $muscleGroup: String!
  ) {
    createExercise(
      name: $name
      description: $description
      sets: $sets
      reps: $reps
      muscleGroup: $muscleGroup
    ) {
      _id
      name
      description
      sets
      reps
      muscleGroup
    }
  }
`;
