import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface bmiQueryParameters{
    height: number,
    weight: number
}
const validateBmiQueryParams = (query: object): bmiQueryParameters => {
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
    };
};


const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send("Hello FullStack!");
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
        });
    }catch(error: unknown){
        let errorMessage = "";
        if(error instanceof Error){
            errorMessage += error.message;
        }
        res.status(400).json({error: errorMessage});
    }
    
   
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;

    //validation
    if(!("daily_exercises" in req.body) || !("target" in req.body)){
        res.status(400).send({error: "Missing parameters"});
    }

    if(isNaN(Number(target))){
        res.status(400).send({error: "malformatted parameters"});
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target);
    res.send(result);

});

const PORT = 3003;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});