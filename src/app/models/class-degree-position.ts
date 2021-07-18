import { Class, Degree, Student } from 'src/app/models';

export type ClassDegreePosition = {
  id: number;
  class: Class;
  degree: Degree;
  students: Student[];
};
