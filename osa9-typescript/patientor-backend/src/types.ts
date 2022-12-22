export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface Patient{
    id: string,
    name: string,
    ssn: string,
    dateOfBirth: string,
    gender: string,
    occupation: string
}

export enum Gender{
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export type PatientNonSensitive = Omit<Patient, 'ssn'>;
export type NewPatientEntry = Omit<Patient, 'id'>;