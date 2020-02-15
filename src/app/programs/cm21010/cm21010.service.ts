import { ResponseType } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { ConsoleLogService } from './../../_services/console-log.service';
import {
  RequestOptions,
  Response,
  URLSearchParams,
  Headers
} from '@angular/http';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FinDialogService } from './../../_services/fin-dialog/fin-dialog.service';
import { COMPANY } from './../../_model/COMPANY';
import { RecordGroup } from './../../_model/RecordGroup';
import { environment } from '../../../environments/environment';
import { UsersVM } from './UsersVM';

@Injectable()
export class CM21010Service {
  constructor(
    private http: HttpClient,
    private dialogService: FinDialogService,
    private log: ConsoleLogService,
  ) { }
  public getData(
  ): Observable<any> {
    const getURL = '../../../assets/DIVISION.json';
    return this.http.get<any>(getURL);
  }
  public getUserData(
  ): Observable<Array<UsersVM>> {
    const getURL = 'https://principaltest.iliscyber.yangming.com/DD/angular/dist/assets/' + 'USER.json';
    return this.http.get<Array<UsersVM>>(getURL);
  }
  public HandleError(e: any): void {
    console.log(e.error.Message);
    this.dialogService.OpenDialogBox(
      e.error.Message
    );
  }
}
