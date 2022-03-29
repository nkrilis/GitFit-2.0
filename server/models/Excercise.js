const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
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
    sets: {
        type: Number,
        required: true,
        trim: true
    },
    reps: {
        type: Number,
        required: true,
        trim: true
    },
    muscleGroup: {
        type: String,
        required: true,
        trim: true
    },

});

