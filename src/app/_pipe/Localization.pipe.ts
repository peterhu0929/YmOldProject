import { Pipe, PipeTransform } from '@angular/core';

export interface R {
  Message: {
    InternalServerError: string;
  };
  Text: {
  };
}
declare var R: R;

@Pipe({ name: 'i18n' })
export class LocalizationPipe implements PipeTransform {
  transform(key: string, category: string): string {
    category = category ? category : 'Text';
    if (!R.hasOwnProperty(category) || !R[category].hasOwnProperty(key)) {
      return key;
    }
    return R[category][key];
  }
}
