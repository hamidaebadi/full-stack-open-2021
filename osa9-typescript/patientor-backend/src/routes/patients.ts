/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {getPublicPatientsData, addNewPatient} from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patientData = getPublicPatientsData();
    res.send(patientData);
});

//adding new patient
router.post('/', (req, res) => {
    try{
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const toNewEntry = toNewPatientEntry(req.body);
        const addedEntry = addNewPatient(toNewEntry);
        res.send(addedEntry);
    }catch(error: unknown){
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});

export default router;