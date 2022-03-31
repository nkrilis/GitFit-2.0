const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise, WorkoutPlan  } = require('../models');
const { on } = require('../models/WorkoutPlan');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query : {
        getUser: async (_, { _id }, context) => {
            const user = await User.findById(_id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },

        getUsers: async () => {
            const users = await User.find();
            return users;
        },

        // Needs to return WorkoutPlan joined with exercises
        getWorkoutPlan: async (_, { _id }, context) => {
            const workoutPlan = await WorkoutPlan.findById(_id);
            if (!workoutPlan) {
                throw new Error('WorkoutPlan not found');
            }
            return workoutPlan;
        },

        // get all workout plans and populate exercises where the _id is in the exercise model
        getWorkoutPlans: async () => {
            const workoutPlans = await WorkoutPlan.aggregate([
                {
                    $lookup: {
                        from: 'Exercise',
                        localField: 'plan.weeks.days.exercises._id',
                        foreignField: '_id',
                        as: 'exercises'
                    }
                }
            ]);
            return workoutPlans;
        },


        // getWorkoutPlans: async () => {
        //     const workoutPlans = await WorkoutPlan.find().populate('plan.weeks.days.exercises');
                
        //     return workoutPlans;
        // },

        getExercise: async (_, { _id }, context) => {
            const exercise = await Exercise.findById(_id);
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        },

        getExercises: async () => {
            const exercises = await Exercise.find();
            return exercises;
        },
        
    },
    Mutation : {

        createUser: async (_, { firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user._id);
            return { token, user };
        },

       createWorkoutPlan: async (_, { title, description, type, numOfWeeks, plan }) => {
            const workoutPlan = await WorkoutPlan.create({ title, description, type, numOfWeeks, plan });
            return workoutPlan;
        },

        createExercise: async (_, { name, description, sets, reps, muscleGroup }, context) => {
            const exercise = await Exercise.create({ name, description, sets, reps, muscleGroup });
            return exercise;
        },

        updateUser: async (_, { _id, firstName, lastName, email, password }, context) => {
            const user = await User.findByIdAndUpdate(_id, { firstName, lastName, email, password }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },

        updateWorkoutPlan: async (_, { _id, title, description, type, weeks }, context) => {
            const workoutPlan = await WorkoutPlan.findByIdAndUpdate(_id, { title, description, type, weeks }, { new: true });
            if (!workoutPlan) {
                throw new Error('WorkoutPlan not found');
            }
            return workoutPlan;
        },

        updateExercise: async (_, { _id, name, description, sets, reps, muscleGroup }, context) => {
            const exercise = await Exercise.findByIdAndUpdate(_id, { name, description, sets, reps, muscleGroup }, { new: true });
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        },

        deleteUser: async (_, { _id }, context) => {
            const user = await User.findByIdAndDelete(_id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },

        deleteWorkoutPlan: async (_, { _id }, context) => {
            const workoutPlan = await WorkoutPlan.findByIdAndDelete(_id);
            if (!workoutPlan) {
                throw new Error('WorkoutPlan not found');
            }
            return workoutPlan;
        },

        deleteExercise: async (_, { _id }, context) => {
            const exercise = await Exercise.findByIdAndDelete(_id);
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        },

        // login: async (parent, { email, password }) => {
        //     const user = await User.findOne({ email });
      
        //     if (!user) {
        //       throw new AuthenticationError('Incorrect credentials');
        //     }
      
        //     const correctPw = await user.isCorrectPassword(password);
      
        //     if (!correctPw) {
        //       throw new AuthenticationError('Incorrect credentials');
        //     }
      
        //     const token = signToken(user);
      
        //     return { token, user };
        //   }   
    },
};

module.exports = resolvers;