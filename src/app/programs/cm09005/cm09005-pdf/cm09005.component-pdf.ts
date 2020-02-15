import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ConsoleLogService } from '../../../_services/console-log.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgramsService } from '../../programs.service';
import { CASH_SETTLEMENT_MASTER } from '../../../_model/CASH_SETTLEMENT_MASTER';

@Component({
  selector: 'app-cm09005component-pdf',
  templateUrl: './cm09005.component-pdf.html',
  styleUrls: ['./cm09005.component-pdf.scss'],
  providers: [ConsoleLogService]
})
export class CM09005pdfComponent {
  public pSettleData: CASH_SETTLEMENT_MASTER = new CASH_SETTLEMENT_MASTER();

  constructor(
    public dialogRef: MatDialogRef<CM09005pdfComponent>, // 定義dialog問題
    public programService: ProgramsService,
    @Inject(MAT_DIALOG_DATA) public data: any, // 接收從主頁面來的資料
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.pSettleData = this.data.pItem;
  }
  // 刪除資料後跳出material snackBar
  deleteSnackbar() {
    this.programService.openSnackBar(this.data.pUserKey, '已停用');
    this.dialogRef.close();
  }
  private HandleError(e: HttpErrorResponse): void {
    console.log(e);
  }
}



