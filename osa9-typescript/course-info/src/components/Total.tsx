import { coursePart } from '../types';

const Total = ({courses}: {courses: coursePart[]}) => {
    return(
        <p>
        Number of exercises{" "}
        {courses.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    );
};
export default Total;