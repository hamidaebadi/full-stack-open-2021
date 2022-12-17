interface excersiseProgress {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

//get command line parameters
let i = 3;
const target = Number(process.argv[2]);
const trainingDays =[];
while(i < (process.argv.length-2)){
    trainingDays.push(Number(process.argv[i]));
    i+=1;
}

const calculateExercises = (record: Array<number>, target: number): excersiseProgress => {
    const traningHours = record.filter(item => item > 0);
    const totalHours =traningHours.reduce((partialSum, h) => partialSum + h);
    const average = totalHours / 7;
    const success = average >= target;
    let ratingDesc = "";
    let rating = 0;
    if ((average / target) <= 0.33){
        rating = 1;
        ratingDesc = "Not a good training week from you!";
    }else if((average/target) >0.33 && (average/target) <= 0.66){
        rating = 2;
        ratingDesc = "Quite Good training week";
    }else{
        rating = 3
        ratingDesc = "Amazing training week with high success";
    }

    return {
        periodLength: 7,
        trainingDays: traningHours.length,
        success: success,
        rating: rating,
        ratingDescription: ratingDesc,
        target: target,
        average: average
    }

}

console.log(calculateExercises(trainingDays, target));