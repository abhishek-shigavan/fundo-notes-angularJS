import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchNotePipeComponent implements PipeTransform {
  transform(items: any, searchString: string) {
    if(!items) return []
    if(!searchString) return items
    searchString = searchString.toLowerCase()
    return items.filter((item: {title: string, description: string}) => item.title.toLowerCase().includes(searchString) || item.description.toLowerCase().includes(searchString));
  }
}