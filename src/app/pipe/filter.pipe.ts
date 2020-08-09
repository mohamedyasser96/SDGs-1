import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: Object): any {
    if (!items || !filter || filter["aim"] == null) {
      return items;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    return items.filter(item => item.aim.indexOf(filter["aim"]) !== -1);
  }
}
