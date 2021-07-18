import { Pipe, PipeTransform } from '@angular/core';
import { Filter } from 'src/app/models';
import { ClassDegreePosition } from 'src/app/models/class-degree-position';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: ClassDegreePosition[], filter: Filter): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(
      (item) =>
        (!filter.classId || item.class.id === filter.classId) &&
        (!filter.degreeId || item.degree.id === filter.degreeId)
    );
  }
}
