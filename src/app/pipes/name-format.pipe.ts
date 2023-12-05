import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameFormat'
})
export class NameFormatPipe implements PipeTransform {

  transform(value: any): any {
    if (value != null)
    {
      if (value.length > 20)
          value = value.substring(0,20) + '...';
    }
    return value;
  }

}
