const mongoose = require('mongoose');

const { Schema } = mongoose;

const workoutPlanSchema = new Schema({
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
            type: Object,
            weeks: [
                {
                    type: Object,
                    days: [{
                        type: String,
                        exercises: [{
                            type: Schema.Types.ObjectId,
                            ref: "Exercise"
                        }]
                    }]
                }
            ]
        }
    ]

    

    

    // weeks: {
    //     type: Map,
    //     of: [{
    //         type: Schema.Types.ObjectId,
    //         ref: 'Exercise'
    //     }]
    // },
    // exercises: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Exercise'
    // }]  // reference to the exercise model

});

const WorkoutPlan = mongoose.model('WorkoutPlan', workoutPlanSchema);

module.exports = WorkoutPlan;
