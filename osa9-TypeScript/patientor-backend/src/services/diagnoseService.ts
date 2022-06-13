import diagnoseData from '../../data/diagnoses.json';
import {DiagnoseEntry} from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getDiagnoseEntries = (): Array<DiagnoseEntry> => {
    return diagnoses;
}

export default {
    getDiagnoseEntries
}