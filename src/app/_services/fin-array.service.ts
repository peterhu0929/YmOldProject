import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FinArrayService {
  constructor() {}
  /*
   * Remove duplicates from multidimensional array
   * function: multiDimensionalUnique(arr)
   * input:    array
   * output:   unique array
  */
  public multiDimensionalUnique(arr) {
    const uniques = [];
    const itemsFound = {};
    for (let i = 0, l = arr.length; i < l; i++) {
      const stringified = JSON.stringify(arr[i]);
      if (itemsFound[stringified]) {
        continue;
      }
      uniques.push(arr[i]);
      itemsFound[stringified] = true;
    }
    return uniques;
  }
}
