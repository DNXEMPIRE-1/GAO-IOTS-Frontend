import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlTypeDisplay'
})
export class ControlTypeDisplayPipe implements PipeTransform {

  transform(value: number): string {
    let rc = 'Scan';
    if (value == 1)
      rc = 'Enter';
    else if (value == 2)
       rc = 'Exit';

    return rc;
  }

}
