const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    workoutPlan: [WorkoutPlan]!
  }

  type WorkoutPlan {
        _id: ID!
        title: String!
        description: String!
        type: String!
        numOfWeeks: Int!
        plan: [Plan]
    }

    type Plan {
        weeks: [Week]
    }

    input PlanInput {
        weeks: [WeekInput]
    }


    type Week {
        weekNumber: Int!
        days: [Day]
    }

    input WeekInput {
        weekNumber: Int!
        days: [DayInput]
    }

    type Day {
        dayOfWeek: String!
        exercises: [Exercise]
    }

    input DayInput {
        dayOfWeek: String!
        exercises: [String]
    }

    type Exercise {
        _id: ID!
        name: String!
        description: String!
        sets: Int!
        reps: Int!
        muscleGroup: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        users: [User]
        user(username: String!): User
        me: User

        getWorkoutPlan(_id: ID!): WorkoutPlan
        getWorkoutPlans: [WorkoutPlan]
        getExercise(_id: ID!): Exercise
        getExercises: [Exercise]
    }

    type Mutation {

        # Create a new user
        addUser(username: String!, email: String!, password: String!): Auth

        # Login
        login(email: String!, password: String!): Auth
        
        # Create a new workout plan
        createWorkoutPlan(title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [PlanInput] ): WorkoutPlan

        # Create a new exercise
        createExercise(name: String!, description: String!, sets: Int!, reps: Int!, muscleGroup: String!): Exercise

        # Update a workout plan
        updateWorkoutPlan(_id: ID!, title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [PlanInput]): WorkoutPlan

        # Delete a workout plan
        deleteWorkoutPlan(_id: ID!): WorkoutPlan

        # Add a workout plan to a user
        addWorkoutPlanToUser(_id: ID!, workoutPlan: ID!): User

        # Add an exercise to a workout plan in the specified week and day
        addExerciseToWorkoutPlan(_id: ID!, weekNumber: Int!, dayOfWeek: String!, exercise: ID!): WorkoutPlan

        # Remove a workout plan from a user
        removeWorkoutPlanFromUser(_id: ID!, workoutPlan: ID!): User

    }
`;

module.exports = typeDefs;
