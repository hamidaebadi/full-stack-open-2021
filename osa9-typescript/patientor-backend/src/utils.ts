import {Gender, NewPatientEntry, newEntryRecord, HealthCheckRating} from './types';

type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry=>{
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newEntry;
};
type EntryFields = {description: string,
    date: unknown,
    specialist: unknown,
    employerName: unknown,
    criteria: unknown,
    healthCheckRating: unknown,
    type: string,
    dischargeDate: unknown
};
export const toNewEntryRecord = ({description, date, specialist, employerName, criteria, healthCheckRating, type, dischargeDate}: EntryFields): newEntryRecord =>{
    if(type === "OccupationalHealthcare"){
        return {
            description: parseDescription(description),
            date: parseDate(date),
            specialist: parseName(specialist),
            type: "OccupationalHealthcare",
            employerName: parseName(employerName)
        };
    }else if(type === "Hospital"){
        return{
            description: parseDescription(description),
            date: parseDate(date),
            specialist: parseName(specialist),
            type: "Hospital",
            discharge: {
                date: parseDate(dischargeDate),
                criteria: parseCriteria(criteria)
            }
        };
    }

    return{
        description: parseDescription(description),
        date: parseDate(date),
        specialist: parseName(specialist),
        type: "HealthCheck",
        healthCheckRating: parseHealthRate(healthCheckRating),
    };
};


const parseCriteria = (value: unknown):string => {
    if(!value || !isString(value)) throw new Error("Invalid criteria");
    return value;
};
const parseHealthRate = (rate: unknown): HealthCheckRating => {
    if(!rate || !isHealthCheckRate(rate)) throw new Error("Invalid or missing rating");
    return rate;
};

const isHealthCheckRate = (rate: unknown): rate is HealthCheckRating=>{
    return typeof rate === 'number';
};

//validate field name
const parseName = (name: unknown): string=> {
    if(!name || !isString(name)) throw new Error("Incorrect or missing name");
    return name;
};

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)) throw new Error("Incorrect or missing social security number");
    return ssn;
};
const parseDate = (date: unknown): string =>{
    if(!date || !isString(date) || !isDate(date)) throw new Error("Invalid or missing date of birth" + date);
    return date;
};

const parseOccupation = (occ: unknown): string =>{
    if(!occ || !isString(occ)) throw new Error("Incorrect or missing occupation");
    return occ;
};

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)) throw new Error("Incorrect or missing gender" + gender);
    return gender;
};

const parseDescription = (desc: unknown): string => {
    if(!desc || !isString(desc)) throw new Error("Incorrect or missing description");
    return desc;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(gender);
};

const isString = (text: unknown): text is string =>{
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean =>{
    return Boolean(Date.parse(date));
};


export default toNewPatientEntry;