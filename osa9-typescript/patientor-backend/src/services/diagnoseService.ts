import diagnoseData from '../../data/diagnoses.json';
import {Diagnose} from '../types';

const getAllDiagnoses = ():Diagnose[] =>{
    return diagnoseData;
};

export{
    getAllDiagnoses
};