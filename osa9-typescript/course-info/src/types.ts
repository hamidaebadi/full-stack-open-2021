// new types
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
interface CourseNormalPart extends CoursePartWithDesc {
    type: "normal";
}
  
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
interface CourseSubmissionPart extends CoursePartWithDesc {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CoursePartWithDesc extends CoursePartBase{
    description: string
}

interface CoursePartSpecial extends CoursePartWithDesc{
    type: 'special',
    requirements: string[]
}
  
export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CoursePartSpecial;