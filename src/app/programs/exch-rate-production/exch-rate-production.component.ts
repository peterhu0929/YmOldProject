import { Component, OnInit, Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ArDailyExchRate } from '../../_model/AR_DAILY_EXCH_RATE';
import { HttpClient } from '@angular/common/http';
import { ExchrateserviceService } from '../exchrateservice.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource, MatTable } from '@angular/material';

@Component({
  selector: 'app-exch-rate-production',
  templateUrl: './exch-rate-production.component.html',
  styleUrls: ['./exch-rate-production.component.scss']
})

export class ExchRateProductionComponent implements OnInit {
  Title = '當日匯率資料查詢';
  subTitle = '當日匯率正式檔';
  currencyCode: string; // this.currencyCode = '666';
  queryDate: string;             // 變數:型別
  exchRates: ArDailyExchRate[];  // 變數:型別
  exchRates2: Array<ArDailyExchRate>;
  parameterModel: ArDailyExchRate = new ArDailyExchRate();

  tableColumns: string[] =
    ['NO', 'EXCH_DATE', 'CURRENCY_CODE', 'CURRENCY_NAME', 'AVG_PRICE',
      'BUY_PRICE', 'CNTRY_NAME', 'CNTRY_CODE'];
  public exchRatesDataSource = new MatTableDataSource<ArDailyExchRate>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private exchRateService: ExchrateserviceService
  ) { }

  ngOnInit() {
    this.exchRatesDataSource.paginator = this.paginator;
  }

  public Query() {
    // alert(this.currencyCode);     // 動作1-幣別(彈跳視窗)
    // alert(this.queryDate);        // 動作2-日期(彈跳視窗)
    console.log(this.parameterModel);

    // this.exchRateService.GetExchRateData(this.parameterModel).subscribe(
    //   response => {
    //     this.exchRates = response;
    //     console.log(this.exchRates); // log
    //   }
    // );
    this.exchRates = this.exchRateService.TestDate();
    this.exchRatesDataSource.data = this.exchRates;

  }

  public Export() {
    alert(this.queryDate);
  }

  // public GetData(): Observable<ArDailyExchRate[]> {     // 回傳資料     方法():類別<回傳型別[]>
  //  return this.http.get<ArDailyExchRate[]>('http://localhost:3000/exchRates');
  // }
}
