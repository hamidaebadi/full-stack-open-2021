import express from 'express';
import patientServices from '../services/patientService';
import utils from '../utils'
const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientServices.getPatientNonSensitiveData());
});

router.post('/', (req, res) => {
    try{
        const newPatientEntry = utils.toNewPatientEntry(req.body);
        const addedEntry = patientServices.addNewPatientEntry(newPatientEntry);
        res.json(addedEntry);
    }catch(error){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
export default router;