import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import Person from './models/personModels.js';

dotenv.config()

const app = express();

const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended: true}))

mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('MongoDB Connected...')


    //Mongodb: Store Data
    //save
    const newPerson = new Person({
        name: "Aisha",
        age: 18,
        favourite_food: ["Bread", "Swallow", "Chicken", "Spagetti"]
    });
    
    newPerson.save()

    //create
    const arrayOfPeople = [
        {
            name: "Ayo",
            age: 21,
            favourite_food: ["Pasta", "Risotto", "Pizza", "Omelet"]
        },
        {
            name: "Zayn",
            age: 25,
            favourite_food: ["Burrito", "Turkey", "Gravy", "Burgers"]
        },
        {
            name: "Harry",
            age: 26,
            favourite_food: ["Garlic bread", "Steak", "Burrito", "Diary"]
        },
        {
            name: "Mary",
            age: 23,
            favourite_food: ["Puzza", "Pasta", "Scrambled Eggs", "Burrito"]
        }
    ]

    Person.create(arrayOfPeople)

    app.get('/api/people', (req,res) => {
        Person.find().then(people => res.json(people))
    })

    app.get('/api/people/:favourtie_food', (req,res) => {
        Person.find({favourite_food: req.params.favourtie_food}).then(people => res.json(people))
    })
    
    app.put('/api/people/:age', (req,res) => {
        Person.updateOne(
            {age: req.params.age}, 
            {$set: {age: req.body.age}}
        ).then(people => res.json(people))
    })

    app.delete('/api/people/:name', (req,res) => {
        Person.deleteOne({name: req.params.name}).then(people => res.json(people))
    })

    app.delete('/api/people', (req,res) => {
        Person.deleteMany().then(people => res.json(people))
    })

    app.get('/api/people/:favourite_food', (req,res) => {
        Person.find({favourite_food: req.params.favourtie_food})
        .sort('name')
        .limit(2)
        .select('-age')
        .exec((err,data) => {
            if(err) return res.json(err)
                res.json(data)
        })
    })


}).catch((err) =>{
    console.error(err)
})


app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}.....`)
})