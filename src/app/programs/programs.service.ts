
import { Injectable } from '@angular/core';
import { VOUCHER_MASTER } from '../_model/VOUCHER_MASTER';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { COMPANY } from '../_model/COMPANY';
import { RecordGroup } from '../_model/RecordGroup';
import { CURRENCY } from '../_model/CURRENCY';
import { environment } from '../../environments/environment';
import { CASH_CODE } from '../_model/CASH_CODE';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { BUILDING_CONTRACT_MASTER } from '../_model/BUILDING_CONTRACT_MASTER';
import { BUILDING_CONTRACT_DETAIL } from '../_model/BUILDING_CONTRACT_DETAIL';
import { CASH_SETTLEMENT_MASTER } from '../_model/CASH_SETTLEMENT_MASTER';
import { CASH_TRADE_EXCHANGE_BANK } from '../_model/CASH_TRADE_EXCHANGE_BANK';
import { RegularExpressionService } from '../_services/regular-expression.service';
import { CASH_TRADE_VOU_USER } from '../_model/CASH_TRADE_VOU_USER';
import { FIN_BANK } from '../_model/FIN_BANK';
import { OFFICE } from '../_model/OFFICE';
import { AIS_ACCT_LOOKUP } from '../_model/AIS_ACCT_LOOKUP';
import { SETTLE_SUMMARY_REPORT } from './cm09060/SETTLE_SUMMARY_REPORT';
import { SettleQueryModel } from './cm09060/SettleQueryModel';
import { FinDialogService } from '../_services/fin-dialog/fin-dialog.service';


@Injectable({
  providedIn: 'root',
})
export class ProgramsService {

  constructor(private _http: HttpClient
    , public snackBar: MatSnackBar
    , private regularExpressionService: RegularExpressionService
    , private dialogService: FinDialogService,
  ) {
  }
  createAuthorizationHeader() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJpdGdmQHlhbmdtaW5nLmNvbSIsImV4cCI6InltbGl0Z2YxISJ9.rzG7p6uYTqHtswb_V4zromLQS82duMHYxbvTIsJ20l4'
      })
    };
    return httpOptions;
  }
  public OnlyNumbers(evt) {
    this.regularExpressionService.validateOnlyNumbers(evt);
  }
  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 1000,
      // horizontalPosition: 'right'
    });
  }
  public getCompany(userID: string): Observable<Array<RecordGroup>> {

    const headers = this.createAuthorizationHeader();
    console.log(headers);

    const getURL =
      environment.cashtest + 'api/User/GetUserCompanys?userID=' + userID;

    // this.log.WriteLog(getURL);
    return this._http
      .get<Array<COMPANY>>(getURL, headers)
      .map((obj: Array<COMPANY>) => this.MapCompanyToRecordGroup(obj));
  }
  private MapCompanyToRecordGroup(data: Array<COMPANY>): Array<RecordGroup> {
    return data.map(function (item) {
      return { text: item.COMPANY_NAME, value: item.COMPANY_ID };
    });
  }
  public getStatus(): Observable<Array<RecordGroup>> {
    const getURL = environment.production + 'api/CmPublic/GetProstatus';
    const headers = this.createAuthorizationHeader();
    return this._http
      .get<Array<any>>(getURL, headers)
      .map((obj: Array<any>) => this.MapStatusToRecordGroup(obj));
  }
  private MapStatusToRecordGroup(data: Array<any>): Array<RecordGroup> {
    return data.map(function (item) {
      return { text: item.DESCRIPTION, value: item.VALUE };
    });
  }
  public getVoucherType(): Observable<Array<RecordGroup>> {
    const getURL = environment.production + 'api/CmPublic/GetVtypes';
    const headers = this.createAuthorizationHeader();
    return this._http
      .get<Array<any>>(getURL, headers)
      .map((obj: Array<any>) => this.MapVoucherTypeToRecordGroup(obj));
  }
  private MapVoucherTypeToRecordGroup(data: Array<any>): Array<RecordGroup> {
    return data.map(function (item) {
      return { text: item.DESCRIPTION, value: item.VALUE };
    });
  }
  public getAllCompany(): Observable<Array<COMPANY>> {
    const url = environment.entitytest + '/Company';
    return this._http.get<Array<COMPANY>>(url);
  }
  public getCurrency(): Observable<Array<CURRENCY>> {
    const url = environment.entitytest + '/Currency';
    return this._http.get<Array<CURRENCY>>(url);
  }
  public updateCurrency(data: CURRENCY): Observable<CURRENCY> {
    const url = environment.entitytest + '/Currency';
    return this._http.put<CURRENCY>(url, data);
  }
  public getOffice(): Observable<Array<OFFICE>> {
    const url = environment.entitytest + '/OFFICE';
    return this._http.get<Array<OFFICE>>(url);
  }
  public getGetFxRate(pOrig: string, pDest: string, pDays: number): Observable<Number> {
    const url = environment.cashtest + '/AG/GetFxRate';
    let myparams = new HttpParams();
    myparams = myparams.set('P_ORIG', pOrig);
    myparams = myparams.set('P_DEST', pDest);
    myparams = myparams.set('P_DAYS', pDays.toString());
    console.log(url + '?' + myparams);
    return this._http.get<number>(url, { params: myparams });
  }
  public getBankType(): Observable<Array<CASH_CODE>> {
    const url = environment.cashtest + '/CashCode/GetBankType';
    return this._http.get<Array<CASH_CODE>>(url);
  }
  public getBuildingContractData(parameter: BUILDING_CONTRACT_MASTER): Observable<Array<BUILDING_CONTRACT_MASTER>> {
    const url = environment.cashtest + '/AG/GetBuildingContractData';
    let myparams = new HttpParams();
    if (parameter.SEQREF === undefined || parameter.SEQREF === '') {
      myparams = myparams.set('SEQREF', '');
    } else {
      myparams = myparams.set('SEQREF', parameter.SEQREF);
    }
    if (parameter.COUNTRY === undefined || parameter.COUNTRY === '') {
      myparams = myparams.set('COUNTRY', '');
    } else {
      myparams = myparams.set('COUNTRY', parameter.COUNTRY);
    }
    if (parameter.CITY === undefined || parameter.CITY === '') {
      myparams = myparams.set('CITY', '');
    } else {
      myparams = myparams.set('CITY', parameter.CITY);
    }
    if (parameter.SELF_ASSET === undefined || parameter.SELF_ASSET === '') {
      myparams = myparams.set('SELF_ASSET', '');
    } else {
      myparams = myparams.set('SELF_ASSET', parameter.SELF_ASSET);
    }

    // myparams = myparams.set('CRENO', parameter.CRENO);
    // const options: IRequestOptions = { params: myparams };
    console.log(url + '?' + myparams);
    return this._http.get<Array<BUILDING_CONTRACT_MASTER>>(url, { params: myparams });
  }
  public getBuildingContractDataByMonths(pMonths: number): Observable<Array<BUILDING_CONTRACT_MASTER>> {
    const url = environment.cashtest + '/AG/GetBuildingContractDataByMonths?pMonths=' + pMonths;
    console.log(url);
    return this._http.get<Array<BUILDING_CONTRACT_MASTER>>(url);
  }
  public getBuildingContractDataByKeyNO(parameter: BUILDING_CONTRACT_MASTER): Observable<Array<BUILDING_CONTRACT_MASTER>> {
    const url = environment.cashtest + '/AG/GetBuildingContractDataByKeyNO?KeyNO=' + parameter.KEY_NO;
    console.log(url);
    return this._http.get<Array<BUILDING_CONTRACT_MASTER>>(url);
  }
  public getBuildingContractDetailData(parameter: BUILDING_CONTRACT_MASTER): Observable<Array<BUILDING_CONTRACT_DETAIL>> {
    const url = environment.cashtest + '/AG/GetBuildingContractDetailData?FKeyNO=' + parameter.KEY_NO;
    console.log(url);
    return this._http.get<Array<BUILDING_CONTRACT_DETAIL>>(url);
  }
  public getSettlementData(parameter: CASH_SETTLEMENT_MASTER):
    Observable<Array<CASH_SETTLEMENT_MASTER>> {
    const url = environment.cashtest + '/Settle/GetSettlementData';
    // let myparams = new HttpParams();
    // if (parameter.SEQREF) { myparams = myparams.set('SEQREF', parameter.SEQREF); }
    // if (parameter.OP_BANK) { myparams = myparams.set('OP_BANK', parameter.OP_BANK); }
    // const options: IRequestOptions = { params: myparams };
    // console.log(url + '?' + myparams);
    // return this._http.post<Array<CASH_SETTLEMENT_MASTER>>(url, { params: myparams });
    return this._http.post<Array<CASH_SETTLEMENT_MASTER>>(url, parameter);

  }
  public getCashTradeBankData():
    Observable<Array<CASH_TRADE_EXCHANGE_BANK>> {
    const url = environment.cashtest + '/Settle/GetTradeExchangeBank';
    return this._http.get<Array<CASH_TRADE_EXCHANGE_BANK>>(url);
  }
  public getTradVouUser(pType: string):
    Observable<Array<CASH_TRADE_VOU_USER>> {
    const url = environment.cashtest + '/Settle/GetTradeVouUser?TradeType=' + pType;
    return this._http.get<Array<CASH_TRADE_VOU_USER>>(url);
  }
  public getFinBank(pCompanyID: string):
    Observable<Array<FIN_BANK>> {
    const url = environment.cashtest + '/FinBank/GetFinBank';
    let myparams = new HttpParams();
    myparams = myparams.set('COMPANY_ID', pCompanyID);
    myparams = myparams.set('BANK_DESC', '');
    myparams = myparams.set('BANK_CODE', '');
    // const options: IRequestOptions = { params: myparams };
    console.log(url + '?' + myparams);
    return this._http.get<Array<FIN_BANK>>(url, { params: myparams });
  }

  public updateAisAcctLookup(item: AIS_ACCT_LOOKUP):
    Observable<AIS_ACCT_LOOKUP> {
    const url = environment.entitytest + '/AisAcctLookup';
    // console.log(url + '?' + myparams);
    return this._http.put<AIS_ACCT_LOOKUP>(url, item);
  }
  public getSummaryReport(pQueryModel: SettleQueryModel):
    Observable<Array<SETTLE_SUMMARY_REPORT>> {
    const url = environment.cashtest + '/Settle/GetSummaryReport';
    let myparams = new HttpParams();
    myparams = myparams.set('SELL_CCY', '');
    myparams = myparams.set('COMPANY_ID', pQueryModel.COMPANY_ID);
    myparams = myparams.set('TRADE_DATE_S', pQueryModel.TRADE_DATE_S);
    myparams = myparams.set('TRADE_DATE_E', pQueryModel.TRADE_DATE_E);
    console.log(url + '?' + myparams);
    return this._http.get<Array<SETTLE_SUMMARY_REPORT>>(url, { params: myparams });
  }
  // 四捨五入
  mathRound(n: number) {
    n = Math.round(n * 100) / 100;
    // n.toFixed(2);
    return n;
  }
  transferDate(pDate: Date) {
    const strDate =
      pDate.getFullYear().toString() +
      this.addZero((pDate.getMonth() + 1).toString()) +
      this.addZero(pDate.getDate().toString());
    return strDate;
  }
  addZero(m: string) {
    let n;
    if (m.length === 1) {
      n = '0' + m;
    } else {
      n = m;
    }
    return n;
  }

  // 用兩個欄位去做，習慣用法上資料庫顯示面為Y/N
  // 存入ORACLE資料庫的欄位需為VARCHAR
  transferBoolean2DB(pBol: any) {
    if (pBol === true) {
      return 'Y';
    } else if (pBol === false) {
      return 'N';
    }
  }
  transferBoolean2View(pBol: any) {
    if (pBol === 'true') {
      return true;
    } else if (pBol === 'false') {
      return false;
    }
  }
  transferRemind2View(p: any) {
    if (p === 'Y') {
      return '已提醒';
    } else if (p === 'N') {
      return '尚未';
    }
  }
  // 剔除pipe Number,
  removeNumberPipeFormat(formatedNumber) {
    return formatedNumber.replace(/[$,]/g, '');
  }
  onlyNumbers(evt) {
    this.regularExpressionService.validateOnlyNumbers(evt);
  }
  // http呼叫錯誤處理
  public HandleError(e: any): void {
    console.log(e.error.Message);
    this.dialogService.OpenDialogBox(
      e.error.Message
    );
  }
}
