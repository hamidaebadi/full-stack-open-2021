import {CoursePart} from '../types';

const Part = ({part} : {part: CoursePart}) => {
    switch (part.type) {
        case "normal":
            return(
                <>
                    <h5>{part.name} {part.exerciseCount}</h5>
                        {part.description}                
                </>
            );
        
        case "groupProject":
            return(<>
            <h5>{part.name} {part.exerciseCount}</h5>
            <div>
            Project exercises: {part.groupProjectCount}
            </div>
         
            </>)

        case "submission":
            return(
                <>
                <h5>{part.name} {part.exerciseCount}</h5>
                <div>
                {part.description}
                </div>
                    
                Submit to {part.exerciseSubmissionLink}
                </>
            )

        case "special":
            return(
                <>
                <h5>{part.name} {part.exerciseCount}</h5>
                    <div>
                    {part.description}
                    </div>
                    Requirements: {part.requirements.join(', ')}
                </>
            )
        default:
            return(<></>)
    }
};

export default Part;