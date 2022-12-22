import patientData from '../../data/patients.json';
import {PatientNonSensitive} from '../types';

const getPublicPatientsData = ():PatientNonSensitive[] =>{
    return patientData.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export {
    getPublicPatientsData
};