const { Schema, model } = require('mongoose');

const exerciseSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    // sets: {
    //     type: Number,
    //     required: true,
    //     trim: true
    // },
    // reps: {
    //     type: Number,
    //     required: true,
    //     trim: true
    // },
    muscleGroup: {
        type: String,
        required: true,
        trim: true
    },
    video: {
        type: String,
        trim: true
    }

});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;
