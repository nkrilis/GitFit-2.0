const { Schema, model } = require('mongoose');

const workoutPlanSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    numOfWeeks: {
        type: Number,
        required: true,
        trim: true
    },

    plan: [
        {
            weeks: [
                {
                    weekNumber: Number,
                    days: [{
                        dayOfWeek: String,
                        exercises: [{
                            type: String,
                            ref: "Exercise"
                        }]
                    }]
                }
            ]
        }
    ]

});

const WorkoutPlan = model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;
