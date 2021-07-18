import { ClassDegreePosition } from 'src/app/models/class-degree-position';
import { Matter } from 'src/app/models/matter';
import { Teacher } from 'src/app/models/teacher';

export type TeacherPosition = {
  teacher: Teacher;
  matter: Matter;
  positions: ClassDegreePosition[];
};
