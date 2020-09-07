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
    let x =  items.filter(item => item.intendedSDGs.filter(sdg => sdg["name"] == filter["aim"]).length>0);
    return x
  }
}
