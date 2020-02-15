import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ConsoleLogService } from '../../../_services/console-log.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ProgramsService } from '../../programs.service';
import { BUILDING_CONTRACT_MASTER } from '../../../_model/BUILDING_CONTRACT_MASTER';
import { AG00001Service } from '../ag00001.service';

@Component({
  selector: 'app-ag00001component-dialog',
  templateUrl: './ag00001.component-dialog.html',
  providers: [ConsoleLogService]
})
export class AG00001dialogComponent {

  constructor(
    private ag00001Service: AG00001Service,
    public dialogRef: MatDialogRef<AG00001dialogComponent>, // 定義dialog問題
    public programService: ProgramsService,
    @Inject(MAT_DIALOG_DATA) public data: any, // 接收從主頁面來的資料
  ) { }

  ngOnInit() {
    console.log(this.data.pData);
  }
  terminateBuildingContract() {
    this.data.pData.STATUS = '-100';
    this.ag00001Service.terminateBuildingContract(this.data.pData.KEY_NO)
      .subscribe(
        (response: any) => {
          this.deleteSnackbar(this.data.pData.BUILDING_NAME);
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  // 刪除資料後跳出material snackBar
  deleteSnackbar(deleteItem: any) {
    this.programService.openSnackBar(deleteItem, '已停用');
    this.dialogRef.close();
  }
  private HandleError(e: HttpErrorResponse): void {
    console.log(e);
  }
}



