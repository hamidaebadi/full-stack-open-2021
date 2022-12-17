/*
get values from command line
*/

const heigh: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

const calculateBmi = (height: number, weight: number):string =>{
    const tall: number = height/100;
    const bmi: Number = weight / (tall*tall);

    if(bmi <= 18.4){
        return "Underweight";
    }else if(bmi >= 18.5 && bmi <= 24.9){
        return "Normal weight";
    }else if(bmi >= 25){
        return "Overweight";
    }
}

console.log(calculateBmi(heigh, weight))