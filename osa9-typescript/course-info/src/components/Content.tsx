import {CoursePart} from '../types';
import Part from './Part';

const Content = ({courses}: {courses:CoursePart[]}) => {
    return(
        <>
        {courses.map(cp => <Part key={cp.type} part={cp}/>)}
        </>
    );
};
export default Content;