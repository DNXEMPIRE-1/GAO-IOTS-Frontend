import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldFormat'
})

export class FieldFormatPipe implements PipeTransform {

  public static iso8601Date = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i);
  public static timestamp = new RegExp(/^\d{13}$/);
  transform(value: any): any {
    if (value != null)
    {
      let type = typeof value;
      {
        if (type === 'string')
        {
          if (FieldFormatPipe.iso8601Date.test(value))
              value = new Date(value).toUTCString();
          else
              {
                if (value.length > 30)
                  value = value.substring(0,29) + '...';
              }
        }
        else if (type === 'number')
        {
          if (FieldFormatPipe.timestamp.test(value))
             value = new Date(value).toUTCString();
          else if (value === 0)
             value = '';
        }
      }
    }
    return value;
  }

}
