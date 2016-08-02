import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy',
  pure: false
})

export class FilterByPipe implements PipeTransform {
  transform(list: any[], filter: any): any {
    if (!list) return [];
    return list.filter(item=>{
      return item.name.toLowerCase()
              .indexOf(filter.byName.toLowerCase()) !== -1 &&
             (!filter.sym || item.sym === filter.sym)
    })
  }
}

@Pipe({
  name: 'markPipe'
})
export class MarkFilterPipe implements PipeTransform {
  transform(items: any[], args: any[]): any {
    return items.filter(item => item.isShown);
  }
}