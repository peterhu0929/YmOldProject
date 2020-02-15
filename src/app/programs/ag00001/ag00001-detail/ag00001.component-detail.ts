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
import { BUILDING_CONTRACT_MASTER } from '../../../_model/BUILDING_CONTRACT_MASTER';
import { BUILDING_CONTRACT_DETAIL } from '../../../_model/BUILDING_CONTRACT_DETAIL';
import { UsersVM } from '../../cm21010/UsersVM';
import { AG00001Service } from '../ag00001.service';
import { RegularExpressionService } from '../../../_services/regular-expression.service';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { OFFICE } from '../../../_model/OFFICE';
import { environment } from '../../../../environments/environment';
import { User } from 'ym-ngapp-lib';

@Component({
  selector: 'app-ag00001component-detail',
  templateUrl: './ag00001.component-detail.html',
  providers: [ConsoleLogService]
})
// tslint:disable-next-line:component-class-suffix
export class AG00001detailComponent {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sortTable') sortTable: MatSort;
  public totalCount = 0;
  add_yn = false;
  Today = new Date();
  public UserDetailData = new MatTableDataSource<any>();
  public ngContractData: BUILDING_CONTRACT_MASTER = new BUILDING_CONTRACT_MASTER();
  public pContractData: BUILDING_CONTRACT_MASTER = new BUILDING_CONTRACT_MASTER();
  public ngContractDetailData: Array<BUILDING_CONTRACT_DETAIL> = new Array<BUILDING_CONTRACT_DETAIL>();
  public currency: Array<CURRENCY> = new Array<CURRENCY>();
  public office: Array<OFFICE> = new Array<OFFICE>();
  autoCurr: Observable<CURRENCY[]>;
  currControl: FormControl = new FormControl();
  autoOffice: Observable<OFFICE[]>;
  officeControl: FormControl = new FormControl();
  public currencyUserData: User;
  pDays = environment.getRateDay;
  constructor(
    private ag00001Service: AG00001Service,
    public dialogRef: MatDialogRef<AG00001detailComponent>,
    public programService: ProgramsService,
    private dialogService: FinDialogService,
    private regularExpressionService: RegularExpressionService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public log: ConsoleLogService) { }



  ngOnInit() {
    this.currencyUserData = this.data.pUser;
    this.add_yn = true;
    this.Today = new Date();
    this.getCurrency();
    this.getOffice();
    // this.getFxRate(this.ngContractData.CURR, 'TWD');
    if (this.data.pData !== undefined) {
      // 判斷是add還是update
      this.add_yn = false;
      // 關鍵***直接給定資料
      this.ngContractData = this.data.pData;
      // this.change2Sum(this.ngContractData);
    }
    this.autoCurr = this.currControl.valueChanges.pipe(
      map(val => this.currency.filter(x => x.CURR_CD.indexOf(val) >= 0))
    );
    // filter的資料不得為空
    this.autoOffice = this.officeControl.valueChanges.pipe(
      map(val => this.office.filter(x => x.AgentOffice !== undefined && x.AgentOffice != null && x.AgentOffice.indexOf(val) >= 0))
    );
  }
  // 剔除pipe Number,
  removeNumberPipeFormat(formatedNumber) {
    return formatedNumber.replace(/[$,]/g, '');
  }
  onlyNumbers(evt) {
    this.regularExpressionService.validateOnlyNumbers(evt);
  }
  // 將前端資料欄位內容mapping(if)
  AgentOfficeMapping(item: BUILDING_CONTRACT_MASTER) {
    const self = this;
    self.office.forEach(function (x) {
      if (x.AgentOffice === item.SUB_COMPANY_ID) {
        item.SUB_COMPANY_AGENT = x.AGENT;
        item.SUB_COMPANY_OFFICE = x.OFFICE1;
        item.SUB_COMPANY_NAME = x.OFC_NAME;
        item.CITY_BASE = x.CITY_BASE;
      }
    });
  }
  public addWBuildingContractData(addItem: BUILDING_CONTRACT_MASTER) {
    addItem.IN_USER = this.currencyUserData.userID;
    // addItem.FLEX_5 = this.programService.transferBoolean2DB(addItem.FLEX_5);
    this.ag00001Service.addBuildingContract(addItem).subscribe(
      (x: any) => {
        console.log(x);
        this.programService.openSnackBar(x.KEY_NO, '已新增'), this.addWBuildingContractDetailData(x); this.dialogRef.close();
      }, (error: HttpErrorResponse) => this.HandleError(error));
  }
  public addWBuildingContractDetailData(master: BUILDING_CONTRACT_MASTER) {
    const detail = new BUILDING_CONTRACT_DETAIL();
    detail.F_KEY_NO = master.KEY_NO;
    detail.CONTRACT_SEQREF = master.SEQREF;
    detail.CONTRACT_START_DATE = master.RENTED_START_DATE;
    const endDate = new Date(master.RENTED_START_DATE);
    endDate.setFullYear(endDate.getFullYear() + 1);
    endDate.setDate(endDate.getDate() - 1);
    detail.CONTRACT_END_DATE = endDate;
    // this.ag00001Service.calculateSUMDetail(master, detail);
    detail.CONTRACT_MONTH_RENT_ORAMT = master.MONTH_RENT;
    detail.CONTRACT_MONTH_RENT_TWD = master.MONTH_RENT * master.EXCHANGE_RATE;
    detail.CONTRACT_RENT = master.MONTH_RENT / master.RENTED_AREA;
    detail.CONTRACT_MONTH_RENT_TWD = this.ag00001Service.mathRound(detail.CONTRACT_MONTH_RENT_TWD);
    detail.CONTRACT_RENT = this.ag00001Service.mathRound(detail.CONTRACT_RENT);
    detail.IN_USER = this.currencyUserData.userID;
    // this.dialogService.OpenDialogBox(JSON.stringify(detail));
    this.ag00001Service.addBuildingContractDetail(detail).subscribe(
      (x: any) => {
        console.log(x);
        this.programService.openSnackBar(x.KEY_NO, '已新增'), this.dialogRef.close();
      }, (error: HttpErrorResponse) => this.HandleError(error));
  }
  public updateBuildingContractData(updateItem: BUILDING_CONTRACT_MASTER) {
    updateItem.UP_USER = this.currencyUserData.userID;
    updateItem.SELF_ASSET = this.programService.transferBoolean2DB(updateItem.FLEX_5);
    // console.log(updateItem.FLEX_1 + ',' + updateItem.FLEX_2);
    this.ag00001Service.updateBuildingContract(updateItem).subscribe(
      (x: any) => {
        // console.log(x);
        this.programService.openSnackBar(x.KEY_NO, '已更新'), this.dialogRef.close();
      }, (error: HttpErrorResponse) => this.HandleError(error));
  }
  public getCurrency() {
    this.programService
      .getCurrency()
      .subscribe(
        (response: Array<CURRENCY>) => { this.currency = response, console.log(this.currency); },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  public getOffice() {
    this.programService
      .getOffice()
      .subscribe(
        (response: Array<OFFICE>) => {
          this.office = response,
            this.office.forEach(x => x.AgentOffice = x.AGENT + '-' + x.OFFICE1); console.log(this.office);
        },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  public getFxRate(pOrig: string, pDest: string, pDays: number, ) {
    this.programService
      .getGetFxRate(pOrig, pDest, pDays)
      .subscribe(
        (response: number) => {
          this.ngContractData.EXCHANGE_RATE = response;
        },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  //20190730 增加修改SEQREF名稱功能
  public changeSEQ() {
    if (this.ngContractData.SEQREF) {
      const SEQREF_SEQ = this.ngContractData.SEQREF.slice(-3);
      this.ngContractData.SEQREF = this.ngContractData.CITY_BASE + SEQREF_SEQ;
    }
  }
  public change2Sum(item: BUILDING_CONTRACT_MASTER) {
    console.log(item);
    this.ag00001Service.calculateSUM(item);
  }
  highlightFiltered(countryName: string) {
    const inputCountry = this.ngContractData.SUB_COMPANY_ID;
    return countryName.replace(
      inputCountry,
      `<font color="blue"><strong>${inputCountry}</strong></font>`
    );
  }
  changeColor(item: UsersVM): string {
    if (item.DELETE_YN === 'Y') {
      return 'GREEN';
    }
  }
  deleteIcon(item: UsersVM): boolean {
    if (item.DELETE_YN === 'Y') {
      return true;
    } else if (item.DELETE_YN === 'N') {
      return false;
    }
  }
  private HandleError(e: any): void {
    console.log(e.error.InnerException.InnerException);
    this.dialogService.OpenDialogBox(e.error.InnerException.InnerException.Message);
  }
}



