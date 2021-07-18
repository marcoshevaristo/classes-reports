import { Class, Degree } from './';

export type Student = {
  id: number;
  ra?: number;
  name: string;
  degree?: Degree;
  class?: Class;
  degreeId?: number;
  classId?: number;
};
