import patientData from '../../data/patients.json';
import {PatientNonSensitive, NewPatientEntry, Patient} from '../types';
import {v1 as uuid} from 'uuid';

const getPublicPatientsData = ():PatientNonSensitive[] =>{
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addNewPatient = (entry: NewPatientEntry): Patient=>{
    const id: string = uuid();

    const newPatient = {
        id,
        ...entry
    };
    patientData.push(newPatient);
    return newPatient;
};

export {
    getPublicPatientsData,
    addNewPatient
};