const { AuthenticationError } = require('apollo-server-express');
const { User, Excercise, WorkoutPlan  } = require('../models');
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
        getWorkoutPlan: async (_, { _id }, context) => {
            const workoutPlan = await WorkoutPlan.findById(_id);
            if (!workoutPlan) {
                throw new Error('WorkoutPlan not found');
            }
            return workoutPlan;
        },
        getWorkoutPlans: async () => {
            const workoutPlans = await WorkoutPlan.find();
            return workoutPlans;
        },
        getExercise: async (_, { _id }, context) => {
            const exercise = await Excercise.findById(_id);
            if (!exercise) {
                throw new Error('Exercise not found');
            }
            return exercise;
        },
        getExercises: async () => {
            const exercises = await Excercise.find();
            return exercises;
        },
        
    },
    Mutation : {
        createUser: async (_, { firstName, lastName, email, password }) => {
            const user = await User.create({ firstName, lastName, email, password });
            const token = signToken(user._id);
            return { token, user };
        },
        createWorkoutPlan: async (_, { title, description, type }) => {
            const workoutPlan = await WorkoutPlan.create({ title, description, type });
            return workoutPlan;
        },
        createExercise: async (_, { name, description, sets, reps, muscleGroup }) => {
            const exercise = await Excercise.create({ name, description, sets, reps, muscleGroup });
            return exercise;
        },
        updateUser: async (_, { _id, firstName, lastName, email, password }) => {
            const user = await User.findByIdAndUpdate(_id, { firstName, lastName, email, password }, { new: true });
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
      
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const correctPw = await user.isCorrectPassword(password);
      
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
      
            const token = signToken(user);
      
            return { token, user };
          }
    }   
};