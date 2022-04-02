import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_WORKOUT_PLAN = gql`
  mutation createWorkoutPlan( $title: String!, $description: String!, $type: String!, $numOfWeeks: Int!, $plan: plan!) {
    createWorkoutPlan( title: $title, description: $description, type: $type, numOfWeeks: $numOfWeeks, plan: $plan) {
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
