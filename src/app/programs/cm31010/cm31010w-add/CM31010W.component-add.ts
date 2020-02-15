import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ConsoleLogService } from '../../../_services/console-log.service';
import { FinDialogService } from '../../../_services/fin-dialog/fin-dialog.service';
import { Cm31010Component } from '../cm31010.component';
import { Cm31010Service } from '../cm31010.service';
import { FIN_BANK } from '../../../_model/FIN_BANK';
import { RecordGroup } from '../../../_model/RecordGroup';
import { HttpErrorResponse } from '@angular/common/http';
import { CURRENCY } from '../../../_model/CURRENCY';
import { ProgramsService } from '../../programs.service';
import { CASH_CODE } from '../../../_model/CASH_CODE';
import { FIN_BANK_BAL } from '../../../_model/FIN_BANK_BAL';
import { FinBankVM } from '../FinBankVM';

@Component({
  selector: 'app-cm31010wcomponent-dialog',
  templateUrl: './CM31010W.component-add.html',
  providers: [Cm31010Service, ConsoleLogService]
})
// tslint:disable-next-line:component-class-suffix
export class Cm31010WAddComponent {

  public inputNewData: FIN_BANK = new FIN_BANK();
  public refData: FinBankVM = new FinBankVM();
  public inputNewFinBankBalData: FIN_BANK_BAL;
  // = new FIN_BANK_BAL();
  company: Array<RecordGroup> = new Array<RecordGroup>();

  currency: Array<CURRENCY> = new Array<CURRENCY>();
  banktype: Array<CASH_CODE> = new Array<CASH_CODE>();
  public userInfoDatas;
  finbanks: FinBankVM[] = [];
  filteredResults: FinBankVM[] = [];
  Today = new Date();

  constructor(
    public dialogRef: MatDialogRef<Cm31010WAddComponent>,
    public cm31010Service: Cm31010Service,
    public programService: ProgramsService,
    private dialogService: FinDialogService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public log: ConsoleLogService) { }

  // ngAfterViewInit() {
  //   this.refersh();
  // }

  ngOnInit() {
    // this.inputNewData.COMPANY_ID = 'YM';
    this.refData.COMPANY_ID = this.inputNewData.COMPANY_ID;
    // this.inputNewData.BANK_CODE = 'PLDS';
    // const msDate = new Date(this.Today);
    // msDate.setDate(msDate.getFullYear().toString());
    this.inputNewData.BANK_DESC = '測試用銀行' + this.cm31010Service.GenCurrentTimeFileName();
    // this.inputNewData.BANK_ACCOUNT = '12345678';
    this.inputNewData.BANK_TYPE = '3';
    this.inputNewData.CURR_CD = 'USD';
    // this.inputNewData.ACCTNUM = '9826   ZX';
    this.inputNewData.COUNTRY = 'US';
    // this.inputNewData.CUST_CODE = '963852741';
    this.userInfoDatas = JSON.parse(localStorage.getItem('currentUser'));
    this.programService
      .getCompany('KELHUANG')
      .subscribe(
        (response: Array<RecordGroup>) => (this.company = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    this.programService
      .getCurrency()
      .subscribe(
        (response: Array<CURRENCY>) => (this.currency = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    this.programService
      .getBankType()
      .subscribe(
        (response: Array<CASH_CODE>) => (this.banktype = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      // horizontalPosition: 'right'
    });
  }
  public insertData(record: FIN_BANK) {
    this.cm31010Service.Add(record).subscribe(
      (response: FIN_BANK) => {
        // this.dialogService.OpenDialogBox('Add Success').subscribe(
        this.data.pCompayID = record.COMPANY_ID,
          this.data.pBankCode = record.BANK_CODE,
          this.onNoClick(this.data), this.insertDataFinBankBal(record);
        // );
      },
      (error: HttpErrorResponse) => this.HandleError(error));


    // this.onNoClick(this.data);

  }
  public insertDataFinBankBal(record: FIN_BANK): any {
    // this.dialogRef.close();
    console.log(record);
    this.inputNewFinBankBalData = new FIN_BANK_BAL();
    this.inputNewFinBankBalData.COMPANY_ID = record.COMPANY_ID;
    this.inputNewFinBankBalData.BANK_CODE = record.BANK_CODE;
    this.data.COMPANY_ID = record.COMPANY_ID;
    this.data.BANK_CODE = record.BANK_CODE;
    // user要求新銀行餘額表日期為生效日前一天
    const beforeEFF_DATE = new Date(record.EFF_DATE);
    beforeEFF_DATE.setDate(beforeEFF_DATE.getDate() - 1);
    this.inputNewFinBankBalData.BALDATE = beforeEFF_DATE;
    console.log(this.inputNewFinBankBalData.BALDATE);
    this.inputNewFinBankBalData.IN_USER = 'KELHUANG';
    console.log(this.inputNewFinBankBalData);
    // console.log(this.cm31010Service.GenBeforeTime());
    this.cm31010Service.AddFinBankBal(this.inputNewFinBankBalData).subscribe(
      (response: FIN_BANK_BAL) => {
        this.openSnackBar(response.COMPANY_ID + '-' + response.BANK_CODE, '已新增'),
          console.log(response);
      },
      (error: HttpErrorResponse) => this.HandleError(error));
  }
  // private Returnpost(response: any): void {
  //   this.dialogService.OpenDialogBox('Add Success').subscribe(this.onNoClick(response));
  // }
  onNoClick(data?: any): any {
    this.log.WriteLog(data);
    // this.dialogRef.close(data);
    // if (data = 'undefined') {
    //   this.log.WriteLog('1.cancel()=>' + data);
    //   this.dialogRef.close(data);
    // } else {
    //   this.log.WriteLog('2.cancel()=>' + data);
    //   this.dialogRef.close(data);
    // }
    this.dialogRef.close(data);
    console.log(data);
  }
  cancel(data?: any): any {
    if (data = 'undefined') {
      this.log.WriteLog('cancel()=>' + data);
      this.dialogRef.close();
    }
  }
  private HandleError(e: HttpErrorResponse): void {
    console.log(e);
    // console.log(e.json());
    this.dialogService.OpenDialogBox(e.error);
  }
}



