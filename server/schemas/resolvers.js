const { AuthenticationError } = require("apollo-server-express");
const { User, Exercise, WorkoutPlan } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // Query all users and populate their workoutplans and exercises
    users: async () => {
      const users = await User.find({}).populate({
        path: "workoutPlan",
        populate: {
          path: "plan.weeks.days.exercises.exerciseId",
          model: "Exercise",
        },
      });
      return users;
    },

    // Query to get a single user by their username and populate their workout plan and exercises
    user: async (parent, { username }) => {
      const users = User.findOne({ username }).populate({
        path: "workoutPlan",
        populate: {
          path: "plan.weeks.days.exercises.exerciseId",
          model: "Exercise",
        },
      });
      return users;
    },

    // Query a logged in user and populate their workout plan and exercises
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate({
          path: "workoutPlan",
          populate: {
            path: "plan.weeks.days.exercises.exerciseId",
            model: "Exercise",
          },
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Query a workout plan by its id and populate its exercises
    getWorkoutPlan: async (_, { _id }, context) => {
      const workoutPlan = await WorkoutPlan.findById(_id).populate(
        "plan.weeks.days.exercises.exerciseId"
      ).populate("ownerId");

      if (!workoutPlan) {
        throw new Error("WorkoutPlan not found");
      }
      return workoutPlan;
    },

    // Query all workout plans and populate exercises where the _id is in the exercise model
    getWorkoutPlans: async (_, __, context) => {
      const workoutPlans = await WorkoutPlan.find().populate(
        "plan.weeks.days.exercises.exerciseId" 
      ).populate("ownerId");

      return workoutPlans;
    },

    // Query all workout plans by a user's id and populate exercises where the _id is in the exercise model
    getWorkoutPlansByOwnerId: async (_, { ownerId }, context) => {
      const workoutPlans = await WorkoutPlan.find({ ownerId }).populate(
        "plan.weeks.days.exercises.exerciseId"
      ).populate("ownerId");
      
        return workoutPlans;
    },

    // Query a single exercise by id
    getExercise: async (_, { _id }, context) => {
      console.log(`${_id}  context: ${context}`);

      const exercise = await Exercise.findById(_id);
      if (!exercise) {
        throw new Error("Exercise not found");
      }
      return exercise;
    },

    // Query all exercises
    getExercises: async (parent, args, context) => {
      if (context.user) {
        return Exercise.find();
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    // Create a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    // Login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    // Create a new workout plan
    createWorkoutPlan: async (
      parent,
      { _id, ownerId, title, description, type, numOfWeeks, plan }
    ) => {
      const workoutPlan = await WorkoutPlan.create({
        _id,
        ownerId,
        title,
        description,
        type,
        numOfWeeks,
        plan,
      });
      return workoutPlan;
    },

    // Create a new exercise
    createExercise: async (
      parent,
      { name, description, sets, reps, muscleGroup },
      context
    ) => {
      const exercise = await Exercise.create({
        name,
        description,
        sets,
        reps,
        muscleGroup,
      });
      return exercise;
    },

    // Update a workout plan
    updateWorkoutPlan: async (
      parent,
      { _id, title, description, type, numOfWeeks, plan },
      context
    ) => {
      const workoutPlan = await WorkoutPlan.findByIdAndUpdate(
        _id,
        { title, description, type, numOfWeeks, plan },
        { new: true }
      );
      if (!workoutPlan) {
        throw new Error("WorkoutPlan not found");
      }
      return workoutPlan;
    },

    // Add a like to workout plan
    addPlanLike: async (parent, { _id, userLikes }, context) => {
      const workoutPlan = await WorkoutPlan.find(
        { _id: _id },
        {
          userLikes: {
            $elemMatch: { $eq: userLikes },
          },
        }
      );
      console.log(workoutPlan[0].userLikes);
      if (workoutPlan[0].userLikes.length === 0) {
        const updateLikes = await WorkoutPlan.findByIdAndUpdate(
          _id,
          {
            $inc: { likes: 1 },
            $push: { userLikes: userLikes },
          },
          { new: true }
        );
        return updateLikes;
      } else {
        throw new Error("Already liked by User");
      }
    },

    // Remove a like to workout plan
    removePlanLike: async (parent, { _id, userLikes }, context) => {
      const workoutPlan = await WorkoutPlan.find(
        { _id: _id },
        {
          userLikes: {
            $elemMatch: { $eq: userLikes },
          },
        }
      );
      console.log(workoutPlan[0].userLikes);
      if (workoutPlan[0].userLikes.length !== 0) {
        const updateLikes = await WorkoutPlan.findByIdAndUpdate(
          _id,
          {
            $inc: { likes: -1 },
            $pull: { userLikes: userLikes },
          },
          { new: true }
        );
        return updateLikes;
      } else {
        throw new Error("Error removing like");
      }
    },

    // Update an exercise
    deleteWorkoutPlan: async (parent, { _id }, context) => {
      const workoutPlan = await WorkoutPlan.findByIdAndDelete(_id);
      if (!workoutPlan) {
        throw new Error("WorkoutPlan not found");
      }
      return workoutPlan;
    },

    // Add workout plan to user
    addWorkoutPlanToUser: async (parent, { _id, workoutPlan }, context) => {
      const user = await User.findByIdAndUpdate(
        _id,
        { $push: { workoutPlan } },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },

    // Remove workout plan from user
    removeWorkoutPlanFromUser: async (
      parent,
      { _id, workoutPlan },
      context
    ) => {
      const user = await User.findByIdAndUpdate(
        _id,
        { $pull: { workoutPlan } },
        { new: true }
      );
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    },

    // Add an exercise to a workout plan in the specified week and day
    addExerciseToWorkoutPlan: async (
      parent,
      { _id, week, day, exercise },
      context
    ) => {
      const workoutPlan = await WorkoutPlan.findByIdAndUpdate(
        _id,
        { $push: { "plan.weeks.$.days.$.exercises": exercise } },
        { new: true }
      );
      if (!workoutPlan) {
        throw new Error("WorkoutPlan not found");
      }
      return workoutPlan;
    },
  },
};

module.exports = resolvers;
