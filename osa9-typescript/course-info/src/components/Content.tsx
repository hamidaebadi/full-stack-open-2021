import {coursePart} from '../types';

const Content = ({courses}: {courses:coursePart[]}) => {
    return(
        <>
        {courses.map(cp => <p key={cp.name}>{cp.name} {cp.exerciseCount}</p>)}
        </>
    );
};
export default Content;