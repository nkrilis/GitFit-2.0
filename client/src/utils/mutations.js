import { gql } from '@apollo/client';

// Login mutation
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

// Create a new user
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

// Create a new workout plan
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

// Create a new exercise
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

// Add workout plan to user
export const ADD_WORKOUT_PLAN_TO_USER = gql`
  mutation addWorkoutPlanToUser($userId: ID!, $workoutPlanId: ID!) {
    addWorkoutPlanToUser(userId: $userId, workoutPlanId: $workoutPlanId) {
      _id
      username
      workoutPlans {
        _id
        title
        description
        type
        numOfWeeks
        plan
      }
    }
  }
`;

// Remove workout plan from user
export const REMOVE_WORKOUT_PLAN_FROM_USER = gql`
  mutation removeWorkoutPlanFromUser($userId: ID!, $workoutPlanId: ID!) {
    removeWorkoutPlanFromUser(userId: $userId, workoutPlanId: $workoutPlanId) {
      _id
      username
      workoutPlans {
        _id
        title
        description
        type
        numOfWeeks
        plan
      }
    }
  }
`;

// Add exercise to workout plan
export const ADD_EXERCISE_TO_WORKOUT_PLAN = gql`
  mutation addExerciseToWorkoutPlan( $workoutPlanId: ID!, $weekNumber: Int!, $dayOfWeek: String!, $exerciseId: ID!) {
    addExerciseToWorkoutPlan(workoutPlanId: $workoutPlanId, weekNumber: $weekNumber, dayOfWeek: $dayOfWeek, exerciseId: $exerciseId) {
      _id
      title
      description
      type
      numOfWeeks
      plan
    }
  }
`;

// Remove exercise from workout plan
export const REMOVE_EXERCISE_FROM_WORKOUT_PLAN = gql`
  mutation removeExerciseFromWorkoutPlan( $workoutPlanId: ID!, $weekNumber: Int!, $dayOfWeek: String!, $exerciseId: ID!) {
    removeExerciseFromWorkoutPlan(workoutPlanId: $workoutPlanId, weekNumber: $weekNumber, dayOfWeek: $dayOfWeek, exerciseId: $exerciseId) {
      _id
      title
      description
      type
      numOfWeeks
      plan
    }
  }
`;

// Update workout plan
export const UPDATE_WORKOUT_PLAN = gql`
  mutation updateWorkoutPlan( $workoutPlanId: ID!, $title: String!, $description: String!, $type: String!, $numOfWeeks: Int!, $plan: plan!) {
    updateWorkoutPlan(workoutPlanId: $workoutPlanId, title: $title, description: $description, type: $type, numOfWeeks: $numOfWeeks, plan: $plan) {
      _id
      title
      description
      type
      numOfWeeks
      plan
    }
  }
`;

// Delete workout plan
export const DELETE_WORKOUT_PLAN = gql`
  mutation deleteWorkoutPlan( $workoutPlanId: ID!) {
    deleteWorkoutPlan(workoutPlanId: $workoutPlanId) {
      _id
      title
      description
      type
      numOfWeeks
      plan
    }
  }
`; 