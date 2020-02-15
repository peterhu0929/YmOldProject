import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SETTLE_SUMMARY_REPORT } from '../SETTLE_SUMMARY_REPORT';
import { ProgramsService } from '../../programs.service';
import { Export2ExcelService } from '../../../_services/export2excel.service';
import { aggregateBy } from '@progress/kendo-data-query';
import { SUM_RESULTS } from '../SUM_RESULTS.';

@Component({
  selector: 'app-cm09060-excel',
  templateUrl: './cm09060-excel.component.html',
  styleUrls: ['./cm09060-excel.component.scss']
})
export class Cm09060ExcelComponent implements OnInit {
  @Input() SummaryExcelData = new Array<SETTLE_SUMMARY_REPORT>();
  @Input() DATE_S: Date;
  @Input() DATE_E: Date;
  public sumData;
  public sumDatas: SUM_RESULTS = new SUM_RESULTS();
  constructor(private programService: ProgramsService,
    private export2ExcelService: Export2ExcelService) { }

  ngOnInit() {
    this.getSUM();
  }
  public save2Excel(component) {
    console.log(component.data);
    if (component.data.length > 0) {
      this.export2ExcelService.export2ExcelFile(component);
    } else {
      this.programService.openSnackBar('請先查詢資料', '確認');
    }
  }
  getSUM() {
    this.sumData = aggregateBy(this.SummaryExcelData,
      [{ field: 'EQ_USD', aggregate: 'sum' },
      { field: 'TRADE_COUNT', aggregate: 'sum' },
      { field: 'SETTLE_TOTAL', aggregate: 'sum' },
      { field: 'SETTLE_COUNT', aggregate: 'sum' },
      { field: 'TOTAL_P', aggregate: 'sum' },
      ]);
    this.sumDatas.SUM_TRADE_COUNT = this.sumData.TRADE_COUNT.sum;
    this.sumDatas.SUM_TRADE_TOTAL = this.sumData.EQ_USD.sum;
    this.sumDatas.SUM_SETTLE_COUNT = this.sumData.SETTLE_COUNT.sum;
    this.sumDatas.SUM_SETTLE_TOTAL = this.sumData.SETTLE_TOTAL.sum;
    this.sumDatas.SUM_TOTAL = this.sumDatas.SUM_TRADE_TOTAL + this.sumDatas.SUM_SETTLE_TOTAL;
    this.sumDatas.SUM_TOTAL = Math.round(this.sumDatas.SUM_TOTAL * 100 * 100) / 10000;
    this.sumDatas.SUM_COUNT = this.sumDatas.SUM_TRADE_COUNT + this.sumDatas.SUM_SETTLE_COUNT;
    // this.sumDatas.SUM_TOTAL_P = this.sumDatas.TOTAL_P.sum;
  }

}
