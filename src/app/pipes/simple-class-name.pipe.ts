import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleClassName'
})
export class SimpleClassNamePipe implements PipeTransform {

  transform(value: any): any {
    if (value != null)
    {
      let index = value.lastIndexOf('.');
      if (index >= 0)
         value = value.substring(index+1);
    }
    return value;
  }

}
