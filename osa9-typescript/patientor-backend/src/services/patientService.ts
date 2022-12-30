import patientData from '../../data/patients';
import {PatientNonSensitive, NewPatientEntry, Patient, newEntryRecord, Entry} from '../types';
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

const findPatientById = (id: string):Patient | undefined => {
    return patientData.find(patient => patient.id === id);
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

const addNewEntryRecord = (entry: newEntryRecord, patientId: string): Entry => {
    const id: string = uuid();
    const newEntryRecord = {
        id,
        ...entry
    };
    const patient = patientData.find(patient => patient.id === patientId);
    patient?.entries.push(newEntryRecord);
    return newEntryRecord;
};

export {
    getPublicPatientsData,
    addNewPatient,
    findPatientById,
    addNewEntryRecord
};