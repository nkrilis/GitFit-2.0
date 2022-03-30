const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        firstName: String!
        lastName: String!
        email: String!
        password: String!
        # WorkoutPlan: [WorkoutPlan]
    }

    type WorkoutPlan {
        _id: ID!
        title: String!
        description: String!
        type: String!
        numOfWeeks: Int!
        plan: [{
            type: Object,
            weeks: [{
                type: Object,
                days: [{
                    type: String,
                    exercises: [Exercise]
                }]
            }]
        }]
       
    }

    type Exercise {
        _id: ID!
        name: String!
        description: String!
        sets: Int!
        reps: Int!
        muscleGroup: String!
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

        # createWorkoutPlan(title: String!, description: String!, type: String!, numOfWeeks: Int!, plan: [weeks: [days: [exercises: [Exercise]]]]): WorkoutPlan


        createExercise(name: String!, description: String!, sets: Int!, reps: Int!, muscleGroup: String!): Exercise

        updateUser(_id: ID!, firstName: String, lastName: String, email: String, password: String): User

        # updateWorkoutPlan(_id: ID!, title: String, description: String, type: String, numOfWeeks: Int, plan: [weeks: [days: [exercises: [Exercise]]]]): WorkoutPlan

        updateExercise(_id: ID!, name: String, description: String, sets: Int, reps: Int, muscleGroup: String): Exercise

        deleteUser(_id: ID!): User

        # deleteWorkoutPlan(_id: ID!): WorkoutPlan

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