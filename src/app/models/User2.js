const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        lastName: {
            type: String,
            default: 'Unknown',
            required: true,
            min: 6,
            max: 255,
        },
        firstName: {
            type: String,
            default: 'Unknown',
            required: true,
            min: 6,
            max: 255,
        },
        password: { type: String, required: true, min: 8, max: 255 },
        email: {
            type: String,
            match: [
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                'Please add a valid email address.',
            ],
            trim: true,
            lowercase: true,
        },
        img: { type: String, default: './img/avatars/11-T.jpg' },
        role: { type: String, default: '0' },
    },
    { timestamps: true },
);

//? Add plugin

module.exports = mongoose.model('User', User);
