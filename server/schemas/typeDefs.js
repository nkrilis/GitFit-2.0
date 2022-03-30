const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        WorkoutPlan: [WorkoutPlan]
    }

    type WorkoutPlan {
        _id: ID!
        title: String!
        description: String!
        type: String!
        numOfWeeks: Int!
        plan: [Weeks]
       
    }

    type Weeks {
        title: String!
        days: [Days]
    }

    input WeeksInput {
        days: [DaysInput]
    }

    type Days {
        title: String!
        exercises: [Exercise]
    }

    input DaysInput {
        title: String!
        exercises: [ExerciseInput]
    }

    type Exercise {
        _id: ID!
        name: String!
        description: String!
        sets: Int!
        reps: Int!
        muscleGroup: String!
    }

    input ExerciseInput {
        _id: ID!
    }

    type Query {
        getUser(_id: ID!): User
        getUsers: [User]
        getWorkoutPlan(_id: ID!): WorkoutPlan
        getWorkoutPlans: [WorkoutPlan]
        getExercise(_id: ID!): Exercise
        getExercises: [Exercise]
    }

    type Mutation {
        createUser(firstName: String!, lastName: String!, email: String!, password: String!): User

        createWorkoutPlan(title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [WeeksInput] ): WorkoutPlan

        createExercise(name: String!, description: String!, sets: Int!, reps: Int!, muscleGroup: String!): Exercise

        updateUser(_id: ID!, firstName: String!, lastName: String!, email: String!, password: String!): User

        # updateWorkoutPlan(_id: ID!, title: String, description: String, type: String, numOfWeeks: Int, plan: [weeks: [days: [exercises: [Exercise]]]]): WorkoutPlan
        updateWorkoutPlan(_id: ID!, title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [WeeksInput]): WorkoutPlan  

        updateExercise(_id: ID!, name: String!, description: String!, sets: Int!, reps: Int!, muscleGroup: String!): Exercise

        deleteUser(_id: ID!): User

        deleteWorkoutPlan(_id: ID!): WorkoutPlan

        deleteExercise(_id: ID!): Exercise
    }
`;

module.exports = typeDefs;

// db.WorkoutPlan.insertOne({ title: "My new Plan", description: "new", plan: [ "week1" : [ ]})


// db.WorkoutPlan.insertOne(
//     { 
//       title: "My new Plan", 
//       description: "new", 
//       plan: [ 
//               {
//                 "week1" : [
//                             { $ref: "Exercise", $id: ObjectId("62447b6bf4a1bf07b42af74f") },
//                             { $ref: "Exercise", $id: ObjectId("62447b6bf4a1bf07b42af750") }
//                            ]
//               },
//               {
//               "week2":    [
//                             { $ref: "Exercise", $id: ObjectId("62447b6bf4a1bf07b42af74f") },
//                             { $ref: "Exercise", $id: ObjectId("62447b6bf4a1bf07b42af750") }
//                            ]
//               }
//               ]
//     })