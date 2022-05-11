const { Schema, model } = require("mongoose");

const workoutPlanSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  paid: {
    type: Boolean,
    default: false,
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  numOfWeeks: {
    type: Number,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  userLikes: [String],

  plan: [
    {
      weeks: [
        {
          weekNumber: Number,
          days: [
            {
              dayOfWeek: String,
              exercises: [
                {
                  exerciseId: {
                    type: String,
                    ref: "Exercise",
                  },
                  userSets: {
                    type: Number,
                    default: 0,
                  },
                  userReps: {
                    type: Number,
                    default: 0,
                  },
                  rpe: {
                    type: Number,
                    default: 0,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const WorkoutPlan = model("WorkoutPlan", workoutPlanSchema);

module.exports = WorkoutPlan;
