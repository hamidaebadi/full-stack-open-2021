interface excersiseReport {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface exeCalcuValues {
    target: number,
    trainingHours: Array<number>
}

interface RatingTabel{
    rating: number,
    ratingDesc: string
}

const parseExerArguments = (args: Array<string>): exeCalcuValues => {
    const trainingHours: Array<number> = [];
    if(args.length < 3) throw new Error("No parameter was provided!");
    if(args.length === 3) throw new Error("Please provide training hours")

    //validate target
    if(isNaN(Number(args[2]))) throw new Error("target parameter should be a number");
    let currentIndex: number = 3;
    //validate and record training hours
    while(currentIndex < args.length){
        //check paramater if it's a number
        if(isNaN(Number(args[currentIndex]))) throw new Error("Training hours can not include non-Number values");
        else trainingHours.push(Number(args[currentIndex]));
        currentIndex++;
    }

    return {
        target: Number(args[2]),
        trainingHours
    }
}

const countAverage = (trainingHours: Array<number>): number => {
    let total: number = 0.0;
    trainingHours.forEach(num => total += num);
    return total / trainingHours.length;

}

const giveRating = (aveHours: number, targetHours: number): RatingTabel => {
    const aveHourPercent: number = (aveHours / targetHours)*100;
    if(aveHourPercent <= 50){
        return {
            rating: 1,
            ratingDesc: "It's too bad! You need to study more"
        }
    }else if(aveHourPercent > 50 && aveHourPercent <=90){
        return{
            rating: 2,
            ratingDesc: "IT's OKAY! but you can improve it"
        }
    }else{
        return{
            rating: 3,
            ratingDesc: "Well done!"
        }
    }
}
export const calculateExercises = (targetHour: number, trainingHours: Array<number>): excersiseReport => {
    const aveHours: number = countAverage(trainingHours);
    const {rating, ratingDesc} = giveRating(aveHours, targetHour)
    return {
        periodLength: trainingHours.length,
        trainingDays: trainingHours.filter((val) => val !== 0).length,
        success: aveHours === targetHour,
        rating: rating,
        ratingDescription: ratingDesc,
        target: targetHour,
        average: aveHours
    }
}

try{
    const {target, trainingHours} = parseExerArguments(process.argv)

    console.log("Target value: ",target)
    console.log("Training hours: ", trainingHours)
    console.log("Result: ", calculateExercises(target, trainingHours))
}catch(error){
    console.log("Error: ", error.message)
}
