import {Gender, NewPatientEntry} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Fields = {name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown};

const toNewPatientEntry = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatientEntry=>{
    const newEntry: NewPatientEntry = {
        name: parseName(name),
        dateOfBirth: parseDateOfBirth(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation),
        entries: []
    };
    return newEntry;
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
const parseDateOfBirth = (date: unknown): string =>{
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