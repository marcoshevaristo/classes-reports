import { Injectable } from '@angular/core';
import { Student } from 'src/app/models';
import { FileUtil } from 'src/app/shared/utils/file.util';
import ClassesList from 'src/mock-data/classes.json';
import DegreesList from 'src/mock-data/degrees.json';
import StudentsMock from 'src/mock-data/students.json';

@Injectable({ providedIn: 'root' })
export class StudentsService {
  private savedStudents: Student[];

  public saveStudents(students: Student[]) {
    return new Promise((resolve) => {
      FileUtil.saveJsonFile(JSON.stringify(students), `students-${new Date().toLocaleString()}.json`);
      this.savedStudents = students;
      resolve(undefined);
    });
  }

  public getStudents(): Promise<Student[]> {
    if (this.savedStudents) {
      return new Promise((resolve) => {
        resolve(this.savedStudents);
      });
    }
    return this.getOriginalStudentsList();
  }

  public getOriginalStudentsList(): Promise<Student[]> {
    return new Promise((resolve) => {
      resolve(
        StudentsMock.map((student) => {
          return {
            id: student.id,
            name: student.name,
            class: ClassesList.classes.find((clazz) => clazz.id === student.classId),
            degree: DegreesList.find((degree) => degree.id === student.degreeId),
          };
        })
      );
    });
  }
}
