export interface ContentType {
    name: string;
    exerciseCount: number;
}
interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
interface CourseNormalPart extends CourseNormalSubmission {
    type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
}
  
interface CourseSubmissionPart extends CourseNormalSubmission {
    type: "submission";
    exerciseSubmissionLink: string;
}

interface CourseSepcialPart extends CourseNormalSubmission {
    type: "special";
    requirements: Array<string>;
}

interface CourseNormalSubmission extends CoursePartBase{
    description: string;
}

export type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSepcialPart;
  