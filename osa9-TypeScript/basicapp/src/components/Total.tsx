import {ContentType} from '../types';

const Total = ({courseParts}: {courseParts: ContentType[]}) =>{
    return(
        <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
}
export default Total;