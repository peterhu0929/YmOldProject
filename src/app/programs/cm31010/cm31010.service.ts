import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ConsoleLogService } from '../../_services/console-log.service';
import {
  RequestOptions,
  Response,
  URLSearchParams,
  Headers
} from '@angular/http';
// import { FIN_VOUCHER } from '../../../_model/FIN_VOCHER';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { COMPANY } from '../../_model/COMPANY';
import { RecordGroup } from '../../_model/RecordGroup';
// import { V_FIN_VOUCHER } from './V_FIN_VOCHER';
import { EDIChecked } from '../../_model/EDI_CHECKED';
import { FIN_BANK } from '../../_model/FIN_BANK';
import { FIN_BANK_BAL } from '../../_model/FIN_BANK_BAL';
import { CURRENCY } from '../../_model/CURRENCY';
// import { HttpClientService, ServerDomain, IRequestOptions } from '../../_httpclient/http-client.service';
import { FinBankVM } from './FinBankVM';
import { HttpClient, HttpParams, HttpErrorResponse, } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Cm31010Service {
  vfinbankbals: FIN_BANK_BAL[] = [];
  private _ymfinancilal = 'https://ymfinancial.yangming.com/acctmvc/';
  Today = new Date();
  constructor(
    private http: HttpClient,
    private dialogService: FinDialogService,
    private log: ConsoleLogService
  ) { }

  public getFinBank(): Observable<Array<FIN_BANK>> {
    // const getURL = environment.local + '/FinBank';
    const getURL = environment.cashtest + '/cm31010';
    return this.http
      .get<Array<FIN_BANK>>(getURL);
  }
  // public MapYN2Boolean(data: any) {
  //   return data.map(function (item) {
  //     if (data.CITI_EDI === 'Y') {
  //       data.CITI_EDI = true;
  //     } else if (data.CITI_EDI === 'N') {
  //       data.CITI_EDI = false;
  //       console.log('3');
  //       console.log(data.CITI_EDI);
  //     }
  //     return item;
  //   });
  // }
  public getFinBankBal(
    vCOMPANY_ID: string,
    vBANK_CODE: string
  ): Observable<Array<FIN_BANK_BAL>> {
    const getURL =
      environment.cashtest +
      '/FinBankBal/GetFinBankBal?COMPANY_ID=' +
      vCOMPANY_ID +
      '&BANK_CODE=' +
      vBANK_CODE;
    // console.log(getURL);
    return this.http
      .get<Array<FIN_BANK_BAL>>(getURL);

  }
  public getFinBankByViewDetail(
    vCOMPANY_ID: string,
    vBANK_CODE: string
  ): Observable<FIN_BANK_BAL> {
    const getURL =
      environment.production +
      'api/CM31010/GetFinBank?COMPANY_ID=' +
      vCOMPANY_ID +
      '&BANK_CODE=' +
      vBANK_CODE;
    // console.log(getURL);
    return this.http
      .get<FIN_BANK_BAL>(getURL);
    // .map(
    //   (response: Response) => response.json(),
    //   (error: HttpErrorResponse) => this.HandleError(error)
    // );
  }
  GenCurrentTimeFileName() {
    this.Today = new Date();
    const Month = (this.Today.getMonth() + 1).toString();
    const sysdate =
      this.Today.getFullYear().toString() +
      Month +
      this.Today.getDate().toString() +
      this.Today.getHours().toString() +
      this.Today.getMinutes().toString() +
      this.Today.getSeconds().toString();
    // const fileName = sysdate + '.txt';
    return sysdate;
  }

  Add(data: FIN_BANK): Observable<FIN_BANK> {
    const URL = environment.cashtest + '/FinBank';
    // console.log(data);
    return this.http.post<FIN_BANK>(URL, data);
  }
  Update(data: FinBankVM): Observable<FinBankVM> {
    const URL = environment.cashtest + '/FinBank';
    // console.log('UPDATE---');
    // console.log(data);
    return this.http.put<FinBankVM>(URL, data);
  }
  AddFinBankBal(data: FIN_BANK_BAL): Observable<FIN_BANK_BAL> {
    const URL = environment.cashtest + '/FinBankBal/addFinBankBal';
    // console.log(data);
    return this.http.post<FIN_BANK_BAL>(URL, data);
  }
  /**依據條件抓取FIN_VOUCHER */
  public getFinBankByfactor(
    parameter: FinBankVM
  ): Observable<FinBankVM> {
    const URL = environment.cashtest + '/FinBank/GetFinBank';
    let myparams = new HttpParams();
    myparams = myparams.set('COMPANY_ID', parameter.COMPANY_ID);
    if (parameter.BANK_DESC === undefined || parameter.BANK_DESC === '') {
      myparams = myparams.set('BANK_DESC', '');
    } else {
      myparams = myparams.set('BANK_DESC', parameter.BANK_DESC);
    }
    if (parameter.BANK_CODE === undefined || parameter.BANK_CODE === '') {
      myparams = myparams.set('BANK_CODE', '');
    } else {
      myparams = myparams.set('BANK_CODE', parameter.BANK_CODE);
    }
    // const options: IRequestOptions = { params: myparams };
    this.log.WriteLog(URL + '?' + myparams);
    this.log.WriteLog(myparams);
    return this.http
      .get<FinBankVM>(URL, { params: myparams });
  }
  /**依據條件抓取FIN_VOUCHER */
  public getFinBankByfactorOne(
    pCompanyID: string,
    pBankCode: string
  ): Observable<FinBankVM> {
    const URL = environment.cashtest + '/FinBank/GetFinBank';
    let myparams = new HttpParams();
    myparams = myparams.set('COMPANY_ID', pCompanyID);
    myparams = myparams.set('BANK_DESC', '');
    myparams = myparams.set('BANK_CODE', pBankCode);
    // const options: IRequestOptions = { params: myparams };
    this.log.WriteLog(URL + '?' + myparams);
    this.log.WriteLog(myparams);
    return this.http
      .get<FinBankVM>(URL, { params: myparams });
  }




  public HandleError(e: any): void {
    // console.log(e);
    // console.log(e.json());
    this.dialogService.OpenDialogBox(
      e.statusText + '/' + e.url + '/' + e.error
    );
  }
}
