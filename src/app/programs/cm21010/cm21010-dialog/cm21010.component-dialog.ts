import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { ConsoleLogService } from '../../../_services/console-log.service';
import { FinDialogService } from '../../../_services/fin-dialog/fin-dialog.service';
import { FIN_BANK } from '../../../_model/FIN_BANK';
import { RecordGroup } from '../../../_model/RecordGroup';
import { HttpErrorResponse } from '@angular/common/http';
import { CURRENCY } from '../../../_model/CURRENCY';
import { ProgramsService } from '../../programs.service';
import { CASH_CODE } from '../../../_model/CASH_CODE';
import { FIN_BANK_BAL } from '../../../_model/FIN_BANK_BAL';
import { UsersVM } from '../../cm21010/UsersVM';

@Component({
  selector: 'app-cm21010component-dialog',
  templateUrl: './cm21010.component-dialog.html',
  providers: [ConsoleLogService]
})
export class CM21010dialogComponent {

  constructor(
    public dialogRef: MatDialogRef<CM21010dialogComponent>,
    public programService: ProgramsService,
    private dialogService: FinDialogService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public log: ConsoleLogService) { }

  ngOnInit() {
    console.log(this.data.pUserKey);
  }

  deleteSnackbar() {
    this.programService.openSnackBar(this.data.pUserKey, 'OK');
    this.dialogRef.close();
  }
  private HandleError(e: HttpErrorResponse): void {
    console.log(e);
  }
}



