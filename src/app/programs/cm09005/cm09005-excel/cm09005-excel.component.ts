import { Component, OnInit, Input } from '@angular/core';
import { ProgramsService } from '../../programs.service';
import { Export2ExcelService } from '../../../_services/export2excel.service';
import { CASH_SETTLEMENT_MASTER } from '../../../_model/CASH_SETTLEMENT_MASTER';

@Component({
  selector: 'app-cm09005-excel',
  templateUrl: './cm09005-excel.component.html',
  styleUrls: ['./cm09005-excel.component.scss']
})
export class Cm09005ExcelComponent implements OnInit {
  @Input() SettlementExcelData = new Array<CASH_SETTLEMENT_MASTER>();
  constructor(private programService: ProgramsService,
    private export2ExcelService: Export2ExcelService) { }

  ngOnInit() {
  }
  public save2Excel(component) {
    console.log(component.data);
    // (<Array<CASH_SETTLEMENT_MASTER>>component.data).forEach(x => {
    // });
    if (component.data.length > 0) {
      this.export2ExcelService.export2ExcelFile(component);
    } else {
      this.programService.openSnackBar('請先查詢資料', '確認');
    }
  }
}
