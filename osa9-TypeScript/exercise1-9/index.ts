import express from 'express';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

const app = express();

app.get("/hello", (_req, res) => {
    res.send("Hello Fullstack");
})

app.get("/bmi", (req, res) => {
    const {height, weight} = req.query;
    const result: string = calculateBmi(Number(weight), Number(height));
    const resultOBj = {
        height,
        weight,
        result
    }
    res.send(resultOBj);
})

app.post('/exerciseCalculation', (req, res) => {
    if(!req.body) res.send({error: 'parameters missing'}).status(400)
    const {trainingHours, target} = req.body;
    if(isNaN(Number(target)) || trainingHours.length === 0) res.send({error: 'malformatted parameters'}).status(400)
    const result = calculateExercises(target, trainingHours)
    res.send(result)
})

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})