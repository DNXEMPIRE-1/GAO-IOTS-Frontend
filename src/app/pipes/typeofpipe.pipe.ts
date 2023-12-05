import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'typeofpipe'
})
export class TypeofpipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
