import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArDailyExchRate } from '../_model/AR_DAILY_EXCH_RATE';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchrateserviceService {

  constructor(private http: HttpClient) { }
  public TestDate(): ArDailyExchRate[] {
    let exchdata = new Array<ArDailyExchRate>();
    exchdata = [{
      EXCH_DATE: null,
      CURRENCY_CODE: 'AED',
      ABBR_CURRENCY_CODE: 'DH',
      CURRENCY_NAME: '阿拉伯聯合大公國幣',
      AVG_PRICE: 3.673,
      BUY_PRICE: 3.673,
      SALE_PRICE: 3.673,
      IN_DATE: null,
      IN_USER: 'MIS Batch Job',
      CNTRY_CODE: null,
      CNTRY_NAME: null
    },
    {
      EXCH_DATE: null,
      CURRENCY_CODE: 'ARS',
      ABBR_CURRENCY_CODE: 'AP',
      CURRENCY_NAME: '阿根廷幣',
      AVG_PRICE: 37.7095,
      BUY_PRICE: 37.7095,
      SALE_PRICE: 37.7095,
      IN_DATE: null,
      IN_USER: 'MIS Batch Job',
      CNTRY_CODE: null,
      CNTRY_NAME: null
    },
    {
      EXCH_DATE: null,
      CURRENCY_CODE: 'CNY',
      ABBR_CURRENCY_CODE: 'CC',
      CURRENCY_NAME: '人民幣',
      AVG_PRICE: 6.718,
      BUY_PRICE: 6.718,
      SALE_PRICE: 6.718,
      IN_DATE: null,
      IN_USER: 'MIS Batch Job',
      CNTRY_CODE: null,
      CNTRY_NAME: null
    },
    {
      EXCH_DATE: null,
      CURRENCY_CODE: 'CYP',
      ABBR_CURRENCY_CODE: 'CY',
      CURRENCY_NAME: '塞浦路斯',
      AVG_PRICE: 0.5128,
      BUY_PRICE: 0.5128,
      SALE_PRICE: 0.5128,
      IN_DATE: null,
      IN_USER: 'MIS Batch Job',
      CNTRY_CODE: null,
      CNTRY_NAME: null
    },
    {
      EXCH_DATE: null,
      CURRENCY_CODE: 'DKK',
      ABBR_CURRENCY_CODE: 'DK',
      CURRENCY_NAME: '丹麥幣',
      AVG_PRICE: 6.657401,
      BUY_PRICE: 6.657401,
      SALE_PRICE: 6.657401,
      IN_DATE: null,
      IN_USER: 'MIS Batch Job',
      CNTRY_CODE: null,
      CNTRY_NAME: null
    },
    {
      EXCH_DATE: null,
      CURRENCY_CODE: 'EUR',
      ABBR_CURRENCY_CODE: 'EC',
      CURRENCY_NAME: '歐元',
      AVG_PRICE: 0.88957,
      BUY_PRICE: 0.88957,
      SALE_PRICE: 0.88957,
      IN_DATE: null,
      IN_USER: 'MIS Batch Job',
      CNTRY_CODE: null,
      CNTRY_NAME: null
    },
  ] ;
    return exchdata;
  }

  public GetAllExchRateData(): Observable<ArDailyExchRate[]> {     // 回傳資料     方法():類別<回傳型別[]>
    return this.http.get<ArDailyExchRate[]>('http://localhost:3000/exchRates');
  }
  public GetExchRateData(data: ArDailyExchRate): Observable<ArDailyExchRate[]> {
    return this.http.get<ArDailyExchRate[]>('http://localhost:3000/exchRates');
  }

}
