import express from 'express';
import { calculateBmi } from './bmiCalculator';
interface bmiQueryParameters{
    height: number,
    weight: number
}
const validateBmiQueryParams = (query: Object): bmiQueryParameters => {
    if(Object.keys(query).length === 0 || Object.keys(query).length > 2){
        throw new Error("malformatted parameters");
    }

    if(!("height" in query) || !("weight" in query)){
        throw new Error("malformatted parameters");
    }

    if(isNaN(Number(query.height)) || isNaN(Number(query.weight))){
        throw new Error("malformatted parameters");
    }

    return {
        height: Number(query.height),
        weight: Number(query.weight)
    }
}
const app = express();

app.get('/hello', (_req, res) => {
    res.send("Hello FullStack!")
});

app.get('/bmi/', (req, res) => {
    console.log(req.query);
    try{
        const query = validateBmiQueryParams(req.query);
        const tall = query.height;
        const mass = query.weight;
        const bmi = calculateBmi(tall, mass);
        res.json({
            "weight": mass,
            "height": tall,
            "bmi": bmi
        })
    }catch(error: unknown){
        let errorMessage = "";
        if(error instanceof Error){
            errorMessage += error.message;
        }
        res.status(400).json({error: errorMessage})
    }
    
   
});
const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
});