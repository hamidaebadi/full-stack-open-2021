/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import {getPublicPatientsData, addNewPatient, findPatientById, addNewEntryRecord} from '../services/patientService';
import toNewPatientEntry, {toNewEntryRecord} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    const patientData = getPublicPatientsData();
    res.send(patientData);
});

//getting specific patient
router.get('/:id', (req, res) => {
    const foundedPatient = findPatientById(req.params.id);
    if(foundedPatient){
        res.send(foundedPatient);
    }else{
        res.status(400).send("User not found!");
    }
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

//adding a new entry
router.post('/:id/entries', (req, res) => {
    try{
        const userId = req.params.id;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newEntryRecord = toNewEntryRecord(req.body);
        const addedEntry = addNewEntryRecord(newEntryRecord, userId);
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