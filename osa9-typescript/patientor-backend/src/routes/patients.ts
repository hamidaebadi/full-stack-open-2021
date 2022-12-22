import express from 'express';
import {getPublicPatientsData} from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    const patientData = getPublicPatientsData();
    res.send(patientData);
});

export default router;