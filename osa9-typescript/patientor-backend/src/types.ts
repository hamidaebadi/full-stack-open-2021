// eslint-disable-next-line @typescript-eslint/no-empty-interface
export type Entry = HealthCheckEntry | OccupationalHealthcareEntry | HospitalEntry;

export interface BaseEntry{
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating{
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry{
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: {
        startDate: string;
        endDate: string;
    }
}

export interface HospitalEntry extends BaseEntry{
    type: "Hospital";
    discharge:{
        date: string,
        criteria: string
    }
}
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
    occupation: string,
    entries: Entry[]
}

export enum Gender{
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}
// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

// Define Entry without the 'id' property
export type newEntryRecord = UnionOmit<Entry, 'id'>;
export type PatientNonSensitive = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<Patient, 'id'>;