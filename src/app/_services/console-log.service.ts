import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ConsoleLogService {

  constructor() {
  }

  public WriteLog(log: any) {
    if (document.location.hostname === 'localhost') {
      console.log(log);
    }
  }
}
