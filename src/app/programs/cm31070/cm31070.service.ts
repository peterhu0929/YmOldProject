import { ResponseType } from '@angular/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConsoleLogService } from './../../_services/console-log.service';
import {
  RequestOptions,
  Response,
  URLSearchParams,
  Headers
} from '@angular/http';
// import { FIN_VOUCHER } from '../../../_model/FIN_VOCHER';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FinDialogService } from './../../_services/fin-dialog/fin-dialog.service';
import { COMPANY } from './../../_model/COMPANY';
import { RecordGroup } from './../../_model/RecordGroup';
import { V_FIN_VOUCHER } from './V_FIN_VOCHER';
import { EDIChecked } from './../../_model/EDI_CHECKED';
// import {
//   HttpClientService,
//   IRequestOptions,
//   ServerDomain
// } from '../../_httpclient/http-client.service';
import { HttpClient, HttpParams, HttpErrorResponse, HttpHeaders, } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Cm31070Service {
  constructor(
    private http: HttpClient,
    private dialogService: FinDialogService,
    private log: ConsoleLogService
  ) { }
  public getFinVoucher(): Observable<V_FIN_VOUCHER> {
    const getURL = environment.production + 'api/FinVoucher';
    return this.http.get<V_FIN_VOUCHER>(getURL);
  }
  private ReturnFinVoucherData(response: any): V_FIN_VOUCHER {
    // this.log.WriteLog(response.json());
    return response.json();
  }
  /**依據條件抓取FIN_VOUCHER 20180119修改 */
  public getFinVoucherByQuery(
    parameter: V_FIN_VOUCHER
  ): Observable<V_FIN_VOUCHER> {
    // const myheaders = new Headers();
    // myheaders.append('Content-Type', 'application/json');
    const getURL = environment.production + 'api/CM31070/GetMasterGridRead';

    // const myparams = new URLSearchParams();
    let myparams = new HttpParams();
    myparams = myparams.set('COMPANY_ID', parameter.COMPANY_ID);
    myparams = myparams.set('CRENO_YEAR', parameter.CRENO_YEAR);
    myparams = myparams.set('PROSTATUS', parameter.PROSTATUS);
    myparams = myparams.set('VTYPE', parameter.VTYPE);
    myparams = myparams.set('V_DEPT_ID', parameter.V_DEPT_ID);
    myparams = myparams.set(
      'VDATE_FROM',
      parameter.VDATE_FROM.toLocaleDateString()
    );
    myparams = myparams.set(
      'VDATE_TO',
      parameter.VDATE_TO.toLocaleDateString()
    );
    if (parameter.CRENO !== undefined && parameter.CRENO !== '') {
      myparams = myparams.set('CRENO', parameter.CRENO);
    }
    if (parameter.VOUNO !== undefined && parameter.VOUNO !== '') {
      myparams = myparams.set('VOUNO', parameter.VOUNO);
    }
    // const options: RequestOptions = { params: myparams };
    this.log.WriteLog(getURL + '?' + myparams);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpdGdmQHlhbmdtaW5nLmNvbSIsImV4cCI6InltbGl0Z2YxISJ9.rzG7p6uYTqHtswb_V4zromLQS82duMHYxbvTIsJ20l4'
      }),
      params: myparams
    };
    // const options = { params: myparams, headers: ymheader };
    return this.http.get<V_FIN_VOUCHER>(getURL, httpOptions);
    // .map((response: Response) => response.json());
  }



  /**產生EDI檔案給BOA */
  genEDIforBOA(edichecked: EDIChecked): Observable<EDIChecked> {
    const genEDIURL = environment.production + 'api/CM31070/GenerateEDI942';
    // const headers = new Headers();
    // headers.append('Accept', 'text/plain');
    const options = new RequestOptions({ responseType: 3 });
    // const options: IRequestOptions = { responseType: 'blob' };
    return this.http.post<EDIChecked>(
      genEDIURL,
      JSON.stringify(edichecked)
      // options
    );
  }
  /**得到回傳的結果並依據檔名下載回本地端 */
  downloadTxt(data: any, fileName: string) {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.click();
  }
  public HandleError(e: any): void {
    // console.log(e);
    // console.log(e.json());
    this.dialogService.OpenDialogBox(
      e.statusText + '/' + e.url + '/' + e.error
    );
  }
}
