const { AuthenticationError } = require('apollo-server-express');
const { User, Exercise, WorkoutPlan } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    
    users: async () => {
      return User.find().populate('workoutPlan');
    },

    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('workoutPlan');
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('workoutPlan');
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Needs to return WorkoutPlan joined with exercises
    getWorkoutPlan: async (_, { _id }, context) => {
      const workoutPlan = await WorkoutPlan.findById(_id)
      .populate('plan.weeks.days.exercises');
      
      if (!workoutPlan) {
          throw new Error('WorkoutPlan not found');
      }
      return workoutPlan;
  },

    // get all workout plans and populate exercises where the _id is in the exercise model
    getWorkoutPlans: async (_, __, context) => {
      const workoutPlans = await WorkoutPlan.find()
      .populate('plan.weeks.days.exercises');

      return workoutPlans;
    },

    getExercise: async (_, { _id }, context) => {

        console.log(`${_id}  context: ${context}`);

        const exercise = await Exercise.findById(_id);
        if (!exercise) {
            throw new Error('Exercise not found');
        }
        return exercise;
    },

    getExercises: async (parent, args, context) => {
      if (context.user) {
        return Exercise.find();
      }
      throw new AuthenticationError('You need to be logged in!');
    },

  },

  Mutation: {

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    createWorkoutPlan: async (parent, { title, description, type, numOfWeeks, plan }) => {
      const workoutPlan = await WorkoutPlan.create({ title, description, type, numOfWeeks, plan });
      return workoutPlan;
    },

    createExercise: async (parent, { name, description, sets, reps, muscleGroup }, context) => {
        const exercise = await Exercise.create({ name, description, sets, reps, muscleGroup });
        return exercise;
    },

    updateWorkoutPlan: async (parent, { _id, title, description, type, weeks }, context) => {
        const workoutPlan = await WorkoutPlan.findByIdAndUpdate(_id, { title, description, type, weeks }, { new: true });
        if (!workoutPlan) {
            throw new Error('WorkoutPlan not found');
        }
        return workoutPlan;
    },

    deleteWorkoutPlan: async (parent, { _id }, context) => {
        const workoutPlan = await WorkoutPlan.findByIdAndDelete(_id);
        if (!workoutPlan) {
            throw new Error('WorkoutPlan not found');
        }
        return workoutPlan;
    },

    addPlanToUser: async (parent, { _id }, context) => {
      const user = await User.findByIdAndUpdate(context.user._id, { workoutPlan: _id }, { new: true });
      if (!user) {
          throw new Error('User not found');
      }
      return user;
    }

    
  },

};

module.exports = resolvers;
