export const dummyCourseProgress = [
  {
    name: 'UI/UX',
    completed: 4,
    total: 5,
  },
  {
    name: 'Business Analyst',
    completed: 4,
    total: 5,
  },
];
interface CourseType {
  thumbnail: string;
  name: string;
  course_id: string;
}

export interface MainType {
  user_id: string;
  course_id: string;
  id: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  course: CourseType;
  isCourseCompleted: boolean;
}


