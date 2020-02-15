import { Component, OnInit, ViewChild } from '@angular/core';
import { ProgramsService } from '../programs.service';
import { SETTLE_SUMMARY_REPORT } from './SETTLE_SUMMARY_REPORT';
import { SettleQueryModel } from './SettleQueryModel';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSort, MatTableDataSource, MatPaginator, NativeDateAdapter, DateAdapter } from '@angular/material';
import { COMPANY } from '../../_model/COMPANY';
import { SUM_RESULTS } from './SUM_RESULTS.';
import { aggregateBy } from '@progress/kendo-data-query';

@Component({
  selector: 'app-cm09060',
  templateUrl: './cm09060.component.html',
  styleUrls: ['./cm09060.component.scss']
})
export class Cm09060Component implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // 定義排序
  @ViewChild(MatSort) sortTable: MatSort;
  // 定義分頁總數預設為0
  public totalCount = 0;
  public SummaryData = new MatTableDataSource<SETTLE_SUMMARY_REPORT>();
  public pQuery: SettleQueryModel = new SettleQueryModel();
  public sumData;
  public sumDatas: SUM_RESULTS = new SUM_RESULTS();
  public company: Array<COMPANY> = new Array<COMPANY>();
  public selectedRow;
  displayedColumns: string[] = ['BANK_NAME', 'EQ_USD', 'TRADE_COUNT', 'SETTLE_TOTAL', 'SETTLE_COUNT', 'TOTAL', 'COUNT'
    , 'TOTAL_P', 'COUNT_P'];
  constructor(private programService: ProgramsService,
    private dateAdapter: DateAdapter<NativeDateAdapter>) { }

  ngOnInit() {
    // 定義material datapicker語系
    this.dateAdapter.setLocale('zh-TW');
    this.pQuery.COMPANY_ID = 'YM';
    // this.pQuery.TRADE_DATE_S = '20181101';
    // this.pQuery.TRADE_DATE_E = '20181231';
    const startDate = new Date();
    const endDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    this.pQuery.DATE_S = startDate;
    this.pQuery.DATE_E = endDate;
    this.getCompany();
    this.getSummaryReportData(this.pQuery);
  }
  getCompany() {
    /**AllCompany Dropdownlist */
    this.programService
      .getAllCompany()
      .subscribe(
        (response: Array<COMPANY>) => { this.company = response, console.log(this.company); }
        , (error: HttpErrorResponse) => this.programService.HandleError(error)
      );
  }
  getSummaryReportData(item: SettleQueryModel) {
    // console.log(item.DATE_S);
    // console.log(item.DATE_E);
    item.TRADE_DATE_S = this.transferDate(item.DATE_S);
    item.TRADE_DATE_E = this.transferDate(item.DATE_E);
    this.programService.getSummaryReport(item)
      .subscribe(
        (response: any) => {
          this.SummaryData.data = response;
          this.SummaryData.data.forEach(x => x.BANK_NAME = (x.BANK_NAME == null) ? x.OP_BANK : x.BANK_NAME);
          this.SummaryData.paginator = this.paginator;
          this.SummaryData.sort = this.sortTable;
          this.totalCount = response.length;
          this.getSUM();
          console.log(this.SummaryData.data);
        }
        , (error: HttpErrorResponse) => this.programService.HandleError(error)
      );
  }
  getSUM() {
    this.sumData = aggregateBy(this.SummaryData.data,
      [{ field: 'EQ_USD', aggregate: 'sum' },
      { field: 'TRADE_COUNT', aggregate: 'sum' },
      { field: 'SETTLE_TOTAL', aggregate: 'sum' },
      { field: 'SETTLE_COUNT', aggregate: 'sum' },
      ]);
    this.sumDatas.SUM_TRADE_COUNT = this.sumData.TRADE_COUNT.sum;
    this.sumDatas.SUM_TRADE_TOTAL = this.sumData.EQ_USD.sum;
    this.sumDatas.SUM_SETTLE_COUNT = this.sumData.SETTLE_COUNT.sum;
    this.sumDatas.SUM_SETTLE_TOTAL = this.sumData.SETTLE_TOTAL.sum;
    this.sumDatas.SUM_TOTAL = this.sumDatas.SUM_TRADE_TOTAL + this.sumDatas.SUM_SETTLE_TOTAL;
    this.sumDatas.SUM_COUNT = this.sumDatas.SUM_TRADE_COUNT + this.sumDatas.SUM_SETTLE_COUNT;
    this.SummaryData.data.forEach(x => {
      x.TOTAL = (x.EQ_USD + x.SETTLE_TOTAL);
      x.COUNT = (x.TRADE_COUNT + x.SETTLE_COUNT);
      x.TOTAL_P = (x.EQ_USD + x.SETTLE_TOTAL) / (this.sumDatas.SUM_TRADE_TOTAL + this.sumDatas.SUM_SETTLE_TOTAL);
      x.TOTAL_P = Math.round(x.TOTAL_P * 100 * 100) / 100;
      x.EXCEL_TOTAL_P = x.TOTAL_P.toFixed(2) + '%';
      x.COUNT_P = (x.TRADE_COUNT + x.SETTLE_COUNT) / (this.sumDatas.SUM_TRADE_COUNT + this.sumDatas.SUM_SETTLE_COUNT);
      x.COUNT_P = Math.round(x.COUNT_P * 100 * 100) / 100;
      x.EXCEL_COUNT_P = x.COUNT_P.toFixed(2) + '%';
      // x.TOTAL = Math.round(x.TOTAL * 100 * 100) / 10000;
      // x.EXCEL_TOTAL = this.addCommas(x.TOTAL.toString());
    }
    );
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
  // moneyFormat(str: string) {
  //   const pointIndex = str.indexOf('.');
  //   const beforePoint = str.substring(pointIndex, '.');
  //   console.log(str);
  //   if (str.length <= 3) {
  //     return str;
  //   } else {

  //     return this.moneyFormat(str.substr(0, str.length - 3)) + ',' + (str.substr(str.length - 3));
  //   }
  // }
  addCommas(val) {
    // 根据`.`作为分隔，将val值转换成一个数组
    const aIntNum = val.toString().split('.');
    // 整数部分
    let iIntPart = aIntNum[0];
    // 小数部分（传的值有小数情况之下）
    const iFlootPart = aIntNum.length > 1 ? '.' + aIntNum[1] : '';
    const rgx = /(\d+)(\d{3})/;
    // 如果整数部分位数大于或等于5
    if (iIntPart.length >= 5) {
      // 根据正则要求，将整数部分用逗号每三位分隔
      while (rgx.test(iIntPart)) { iIntPart = iIntPart.replace(rgx, '$1' + ',' + '$2'); }
    } return iIntPart + iFlootPart;
  }

}
