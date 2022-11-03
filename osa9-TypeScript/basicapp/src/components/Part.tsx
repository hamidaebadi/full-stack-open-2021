import {CoursePart} from '../types';

const Part = ({part}: {part: CoursePart})=> {
    switch (part.type){
        case "normal":
            return (<>
            <strong>{part.name}  {part.exerciseCount}</strong>
            <p>{part.description}</p>
            </>)

        case "groupProject":
            return (<>
            <strong>{part.name} {part.exerciseCount}</strong>
            <p>{part.groupProjectCount}</p>
            </>)
        case "submission":
            return (<>
            <strong>{part.name}  {part.exerciseCount}</strong>
            <p>{part.description}</p>
            <p>{part.exerciseSubmissionLink}</p>
            </>)

        case "special":
            return (<>
                <strong>{part.name}  {part.exerciseCount}</strong>
                <p>{part.description}</p>
                <p>Required Skills: {part.requirements.join(', ')}</p>
                </>)
        default:
            return(<>Nothing to show</>)
    }
}
export default Part;