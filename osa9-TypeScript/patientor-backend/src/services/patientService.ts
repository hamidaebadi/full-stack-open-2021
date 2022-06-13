import patientData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';
import {NewPatientEntry, NonSensitivePatientEntry, PatientEntry} from '../types';

const getPatientNonSensitiveData = ():NonSensitivePatientEntry[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender, occupation
      }));
}

const getAllPatientEntries = (): PatientEntry[] => {
    return patientData;
}

const addNewPatientEntry = (entry: NewPatientEntry): PatientEntry => {
    const newPatientEntry = {
        id: uuid(),
        ...entry
    }
    patientData.push(newPatientEntry);
    return newPatientEntry;
}

export default {
    getPatientNonSensitiveData,
    getAllPatientEntries,
    addNewPatientEntry
}