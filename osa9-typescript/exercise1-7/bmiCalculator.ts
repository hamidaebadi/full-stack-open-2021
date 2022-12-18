/*
get values from command line
*/

const heigh = Number(process.argv[2]);
const weight = Number(process.argv[3]);

export const calculateBmi = (height: number, weight: number):string|undefined =>{
    const tall: number = height/100;
    const bmi: number = weight / (tall*tall);

    if(bmi <= 18.4){
        return "Underweight";
    }else if(bmi >= 18.5 && bmi <= 24.9){
        return "Normal weight";
    }else if(bmi >= 25){
        return "Overweight";
    }
    return undefined;
};

console.log(calculateBmi(heigh, weight));