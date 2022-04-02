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
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        
        createWorkoutPlan(title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [PlanInput] ): WorkoutPlan

        createExercise(name: String!, description: String!, sets: Int!, reps: Int!, muscleGroup: String!): Exercise

        updateWorkoutPlan(_id: ID!, title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [PlanInput]): WorkoutPlan

        deleteWorkoutPlan(_id: ID!): WorkoutPlan

        addPlanToUser(username: String!, _id: ID!): User

    }
`;

module.exports = typeDefs;
