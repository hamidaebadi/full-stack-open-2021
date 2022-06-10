interface BmiValues {
    mass: number,
    height: number
}
const parseBmiArguments = (args: Array<string>): BmiValues => {
    if (args.length < 4) throw new Error("Not enough parameters");
    if (args.length > 4) throw new Error("Too much parameters provided");

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            mass: Number(args[2]),
            height: Number(args[3])
        }
    }else{
        throw new Error("Provided values were not number");
    }
}

export const calculateBmi = (mass: number, height: number): string => {
    const heightInMeter: number = height / 100;
    const bmi: number = mass / (heightInMeter*heightInMeter);
    switch(true){
        case (bmi < 15):
            return "Emergency underweight";
        case (bmi >= 15 && bmi < 17):
            return "Serious underweight";
        case (bmi >= 17 && bmi < 18.5):
            return "Lower than normal weight";
        case (bmi >= 18.5 && bmi < 25):
            return "Normal Healthy weight";
        case (bmi >= 25 && bmi < 30):
            return "A little overweight";
        case (bmi >= 30 && bmi <35):
            return "Significant overweight";
        case (bmi >= 35 && bmi < 40):
            return "Serious overweight";
        case (bmi >= 40):
            return "Emergency overweight"
        default:
            throw new Error("Something bad happend!")
    }
}

try{
    const {mass, height} = parseBmiArguments(process.argv);
    console.log(calculateBmi(mass, height));
}catch(error){
    console.log("Error: ", error.message);
}