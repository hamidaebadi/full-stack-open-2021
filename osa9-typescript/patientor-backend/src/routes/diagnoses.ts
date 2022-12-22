import express from 'express';
import {getAllDiagnoses} from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
    const diags = getAllDiagnoses();
    res.send(diags);
});

export default router;