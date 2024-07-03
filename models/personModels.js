import mongoose from "mongoose";

const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    favourite_food: {
        type: [String],
        required: true
    },
});


const Person = mongoose.model('Person', personSchema );

export default Person;