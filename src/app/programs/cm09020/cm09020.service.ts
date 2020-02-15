import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// import {
//   HttpClientService,
//   IRequestOptions,
//   ServerDomain
// } from '../../_httpclient/http-client.service';
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
import { V_FIN_VOUCHER } from './V_FIN_VOCHER';
import { EDIChecked } from '../../_model/EDI_CHECKED';
import { CASH_TRADE_MASTER } from '../../_model/CASH_TRADE_MASTER';
import { CASH_TRADE_DETAIL } from '../../_model/CASH_TRADE_DETAIL';
import { FIN_VOUCHER } from '../../_model/FIN_VOUCHER';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams, HttpErrorResponse, } from '@angular/common/http';



@Injectable({
  providedIn: 'root',
})
export class Cm09020Service {
  private jsonserverURL = 'http://localhost:3000/';
  constructor(

    private http: HttpClient,
    private dialogService: FinDialogService,
    private log: ConsoleLogService
  ) { }

  // public getCashTradeMaster(): Observable<CASH_TRADE_MASTER> {
  //   const getURL = environment.cashtest + 'api/CM09020/GetCashTradeMaster';
  //   return this.http
  //     .get(getURL)
  //     .map(
  //       (response: Response) => response.json(),
  //       (error: HttpErrorResponse) => this.HandleError(error)
  //     );
  // }
  public getCashTradeDetail(pDetailKey: Number): Observable<CASH_TRADE_DETAIL> {
    const getURL = environment.cashtest + '/CashTradeDetail?F_KEY_NO=' + pDetailKey;
    return this.http.get<CASH_TRADE_DETAIL>(getURL);
    // .map(
    //   (response: Response) => response.json(),
    //   (error: HttpErrorResponse) => this.HandleError(error)
    // );
  }
  /**依據條件抓取CashTradeMaster */
  public getCashTradeMasterByQuery(
    parameter: CASH_TRADE_MASTER
  ): Observable<CASH_TRADE_MASTER> {
    // const myheaders = new Headers();
    // myheaders.append('Content-Type', 'application/json');
    const getURL = environment.cashtest + '/CM09020/GetCashTradeMaster';
    let myparams = new HttpParams();
    myparams = myparams.set('YEAR_P1', parameter.YEAR_P1);
    if (parameter.SEQREF === undefined || parameter.SEQREF === '') {
      myparams = myparams.set('SEQREF', '');
    } else {
      myparams = myparams.set('SEQREF', parameter.SEQREF);
    }
    // if (parameter.VOUNO !== undefined && parameter.VOUNO !== '') {
    //   myparams.append('VOUNO', parameter.VOUNO);
    // }
    // const options: IRequestOptions = { params: myparams };
    this.log.WriteLog(getURL + '?' + myparams);
    this.log.WriteLog(myparams);
    return this.http
      .get<CASH_TRADE_MASTER>(getURL, { params: myparams });
    // .map((response: Response) => response.json());
  }

  /**依據條件抓取FinVoucher */
  public getFinVoucherByQuery(
    parameter: FIN_VOUCHER
  ): Observable<FIN_VOUCHER> {
    // const myheaders = new Headers();
    // myheaders.append('Content-Type', 'application/json');
    const getURL = environment.cashtest + '/CM09020/GetFinVoucher';
    let myparams = new HttpParams();
    myparams = myparams.set('YEAR', parameter.YEAR);
    myparams = myparams.set('CRENO', parameter.CRENO);
    // const options: IRequestOptions = { params: myparams };
    this.log.WriteLog(getURL + '?' + myparams);
    return this.http
      .get<FIN_VOUCHER>(getURL, { params: myparams });
    // .map((response: Response) => response.json());
  }

  public HandleError(e: any): void {
    // console.log(e);
    // console.log(e.json());
    this.dialogService.OpenDialogBox(
      e.statusText + '/' + e.url + '/' + e.error
    );
  }
}
