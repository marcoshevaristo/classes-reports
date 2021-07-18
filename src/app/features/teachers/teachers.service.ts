import { Injectable } from '@angular/core';
import { TeacherPosition } from 'src/app/models/teacher-position';
import { FileUtil } from 'src/app/shared/utils/file.util';

@Injectable()
export class TeachersService {
  public saveTeacherPositions(teacherPositions: TeacherPosition[]) {
    return new Promise((resolve) => {
      FileUtil.saveJsonFile(JSON.stringify(teacherPositions), `teacher-positions-${new Date().toLocaleString()}.json`);
      resolve(undefined);
    });
  }
}
