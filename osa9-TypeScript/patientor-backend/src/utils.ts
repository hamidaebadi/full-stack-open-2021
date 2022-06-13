import {NewPatientEntry, Gender} from './types'

type Field = {
    name: unknown,
    dateOfBirth: unknown,
    ssn: unknown,
    gender: unknown,
    occupation: unknown
}

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Field): NewPatientEntry => {
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    }
    return newEntry;
}


//field validation and parsing
const parseName = (name: unknown): string => {
    if(!name || !isString(name)) {
        throw new Error("Error: missing or incorrect name field");
    }
    return name;
}

const parseDate = (date: unknown): string => {
    if(!date || !isString(date) || !isDate(date)){
        throw new Error("Error: missing or incorrect date");
    }
    return date;
}

const parseSsn = (ssn: unknown): string => {
    if(!ssn || !isString(ssn)){
        throw new Error("Error: missing or incorrect ssn");
    }
    return ssn;
}

const parseOccupation = (occ: unknown):string => {
    if(!occ || !isString(occ)){
        throw new Error("Error: missing or incorrect occupation");
    }
    return occ;
}

const parseGender = (gender: unknown): Gender => {
    if(!gender || !isGender(gender)){
        throw new Error ('Error: incorrect or missing gender');
    }
    return gender;
}

//type Guards
const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
}

const isString = (field: unknown): field is string => {
    return typeof field === 'string' || field instanceof String; 
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}
export default {
    toNewPatientEntry
}