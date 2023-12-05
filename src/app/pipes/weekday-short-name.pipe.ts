import { Pipe, PipeTransform } from '@angular/core';
import { StringMapping } from '../model/stringmapping';

@Pipe({
  name: 'weekdayShortName'
})
export class WeekdayShortNamePipe implements PipeTransform {

  transform(dayIndex: number): string {
    return StringMapping.getDayShortString(dayIndex);
  }

}
