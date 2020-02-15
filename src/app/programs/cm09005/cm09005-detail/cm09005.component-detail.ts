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
import { CASH_SETTLEMENT_MASTER } from '../../../_model/CASH_SETTLEMENT_MASTER';
import { RegularExpressionService } from '../../../_services/regular-expression.service';
import { CASH_TRADE_EXCHANGE_BANK } from '../../../_model/CASH_TRADE_EXCHANGE_BANK';
import { CASH_TRADE_VOU_USER } from '../../../_model/CASH_TRADE_VOU_USER';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { StringifyOptions } from 'querystring';
import { CASH_TRADE_MASTER } from '../../../_model/CASH_TRADE_MASTER';
import { CM09005Service } from '../cm09005.service';
import { CUR_AMT } from '../CUR_AMT';
import { retry } from 'rxjs/operators';
import { UserService, User } from 'ym-ngapp-lib';


@Component({
  selector: 'app-cm09005component-detail',
  templateUrl: './cm09005.component-detail.html',
  providers: [ConsoleLogService]
})
// tslint:disable-next-line:component-class-suffix
export class CM09005detailComponent {

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sortTable') sortTable: MatSort;
  public totalCount = 0;
  // public isDisabled = false;
  public UserDetailData = new MatTableDataSource<any>();
  public ngContractData: BUILDING_CONTRACT_MASTER = new BUILDING_CONTRACT_MASTER();
  public ngSettleDetailData: CASH_SETTLEMENT_MASTER = new CASH_SETTLEMENT_MASTER();
  public newData: CASH_SETTLEMENT_MASTER = new CASH_SETTLEMENT_MASTER();

  public SettleData: CASH_SETTLEMENT_MASTER;
  public cTradeBankData: Array<CASH_TRADE_EXCHANGE_BANK> = new Array<CASH_TRADE_EXCHANGE_BANK>();
  public cCurrency: Array<CURRENCY> = new Array<CURRENCY>();
  public cTradeVouUser: Array<CASH_TRADE_VOU_USER> = new Array<CASH_TRADE_VOU_USER>();
  filteredOptions: Observable<FIN_BANK[]>;
  autoCurr_T1Sell: Observable<CURRENCY[]>;
  autoCurr_T1Buy: Observable<CURRENCY[]>;
  autoCurr_T2Sell: Observable<CURRENCY[]>;
  autoCurr_T2Buy: Observable<CURRENCY[]>;
  public action: string;
  public add_yn: boolean;
  public copy_yn: boolean;
  public update_yn: boolean;

  public finbank: Array<FIN_BANK> = new Array<FIN_BANK>();
  public currency: Array<CURRENCY> = new Array<CURRENCY>();

  public copyData: CASH_SETTLEMENT_MASTER;

  public selected: Array<CUR_AMT> = new Array<CUR_AMT>();

  public userSelected1: CUR_AMT = new CUR_AMT();
  public userSelected2: CUR_AMT = new CUR_AMT();
  // public selectedAMT: Array<number> = new Array<number>();
  myControl: FormControl = new FormControl();
  currControl_T1Sell: FormControl = new FormControl();
  currControl_T1Buy: FormControl = new FormControl();
  currControl_T2Sell: FormControl = new FormControl();
  currControl_T2Buy: FormControl = new FormControl();
  checked = false;
  public currencyUserData: User;
  constructor(
    public dialogRef: MatDialogRef<CM09005detailComponent>,
    public programService: ProgramsService,
    public cm09005Service: CM09005Service,
    private userService: UserService,
    private regularExpressionService: RegularExpressionService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public log: ConsoleLogService) { }



  ngOnInit() {
    console.log(this.data.flag);
    this.getUser();
    if (this.data.selectedItem !== undefined && this.data.flag === 'DETAIL') {
      this.ngSettleDetailData = new CASH_SETTLEMENT_MASTER();
      this.ngSettleDetailData = this.data.selectedItem;
      this.action = '看細節';
      this.update_yn = true;
      console.log('DETAIL');
    }
    if (this.data.flag === 'COPY') {
      this.ngSettleDetailData = new CASH_SETTLEMENT_MASTER();
      this.ngSettleDetailData = this.data.selectedItem;
      this.ngSettleDetailData.isDisabled = true;
      this.action = '複製一筆';
      this.copy_yn = true;
      this.update_yn = false;
      console.log('COPY');
    }
    if (this.data.flag === 'ADD') {
      this.ngSettleDetailData = new CASH_SETTLEMENT_MASTER();
      this.ngSettleDetailData = this.newData;
      this.ngSettleDetailData.isDisabled = true;
      this.action = '新增一筆';
      this.add_yn = true;
      this.update_yn = false;
      console.log('ADD');
    }
    // this.ngSettleDetailData.isDisabled = true;
    // this.getBuildingDetailContract(this.ngContractData);
    // this.GetUsersbyUserKey(this.data.pUserKey);
    console.log(this.data.TradeBank);
    this.ngSettleDetailData.COMPANY_ID = 'YM';

    // this.getCurrency();
    this.getFinBank('YM');

    this.cTradeBankData = this.data.TradeBank;
    this.cCurrency = this.data.Currency;
    this.cTradeVouUser = this.data.TradeVouUser;
    // autocomplete filter行為
    // 存入銀行
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(val => this.finbank.filter(x => x.BANK_CODE.indexOf(val) >= 0))
    );
    // 4個幣別
    this.autoCurr_T1Sell = this.currControl_T1Sell.valueChanges.pipe(
      map(val => this.cCurrency.filter(x => x.CURR_CD.indexOf(val) >= 0))
    );
    this.autoCurr_T1Buy = this.currControl_T1Buy.valueChanges.pipe(
      map(val => this.cCurrency.filter(x => x.CURR_CD.indexOf(val) >= 0))
    );
    this.autoCurr_T2Sell = this.currControl_T2Sell.valueChanges.pipe(
      map(val => this.cCurrency.filter(x => x.CURR_CD.indexOf(val) >= 0))
    );
    this.autoCurr_T2Buy = this.currControl_T2Buy.valueChanges.pipe(
      map(val => this.cCurrency.filter(x => x.CURR_CD.indexOf(val) >= 0))
    );
  }
  addT1_SELL_AMT(item: CASH_SETTLEMENT_MASTER) {
    this.selected.push({ SELECTED_CURRENCY: item.T1_SELL_CURRENCY, SELECTED_AMT: item.T1_SELL_AMT });
    this.groupBy(this.selected);

  }
  addT1_BUY_AMT(item: CASH_SETTLEMENT_MASTER) {
    this.selected.push({ SELECTED_CURRENCY: item.T1_BUY_CURRENCY, SELECTED_AMT: item.T1_BUY_AMT });
    this.groupBy(this.selected);
  }
  addT2_BUY_AMT(item: CASH_SETTLEMENT_MASTER) {
    this.selected.push({ SELECTED_CURRENCY: item.T2_BUY_CURRENCY, SELECTED_AMT: item.T2_BUY_AMT });
    this.groupBy(this.selected);
  }
  addT2_SELL_AMT(item: CASH_SETTLEMENT_MASTER) {
    // console.log(flag);
    this.selected.push({ SELECTED_CURRENCY: item.T2_SELL_CURRENCY, SELECTED_AMT: item.T2_SELL_AMT });
    // this.selected.splice({ SELECTED_CURRENCY: item.T2_SELL_CURRENCY, SELECTED_AMT: item.T2_SELL_AMT });
    this.groupBy(this.selected);
  }
  groupBy(origin: Array<CUR_AMT>) {
    const set = new Set();
    const result = origin.filter(item => !set.has(item.SELECTED_AMT) &&
      !set.has(item.SELECTED_CURRENCY) ? set.add(item.SELECTED_AMT) : false);
    console.log('groupby');
    console.log(result);
    this.selected = result;
  }

  summayAMT1(item: CUR_AMT) {
    this.ngSettleDetailData.SETTLEMRNT_T1_CURRENCY = item.SELECTED_CURRENCY;
    this.ngSettleDetailData.SETTLEMENT_T1_AMT = item.SELECTED_AMT;
    this.ngSettleDetailData.SETTLEMENT_AMT = this.ngSettleDetailData.SETTLEMENT_T1_AMT - this.ngSettleDetailData.SETTLEMENT_T2_AMT;
    this.ngSettleDetailData.SETTLEMENT_CURRENCY = this.ngSettleDetailData.SETTLEMRNT_T1_CURRENCY;
  }
  summayAMT2(item: CUR_AMT) {
    this.ngSettleDetailData.SETTLEMENT_T2_CURRENCY = item.SELECTED_CURRENCY;
    this.ngSettleDetailData.SETTLEMENT_T2_AMT = item.SELECTED_AMT;
    this.ngSettleDetailData.SETTLEMENT_AMT = this.ngSettleDetailData.SETTLEMENT_T1_AMT - this.ngSettleDetailData.SETTLEMENT_T2_AMT;
  }

  addData(item: CASH_SETTLEMENT_MASTER) {
    item.IN_USER = this.currencyUserData.userID;
    this.cm09005Service.addSettlmentData(item).subscribe(
      (x: any) => {
        // console.log(x);
        this.programService.openSnackBar(x.KEY_NO, '已新增'), console.log(item), this.dialogRef.close();
      }, (error: HttpErrorResponse) => this.HandleError(error));
  }

  updateData(item: CASH_SETTLEMENT_MASTER) {
    this.cm09005Service.updateCashSettlement(item).subscribe(
      (x: any) => {
        console.log(x);
        this.programService.openSnackBar(x.KEY_NO, '已修改'),
          console.log(item),
          this.dialogRef.close();
      }, (error: HttpErrorResponse) => { this.HandleError(error), console.log(item); });
  }

  copyAddData(item: CASH_SETTLEMENT_MASTER) {
    // 複製要new一個新的記憶體位置
    this.copyData = new CASH_SETTLEMENT_MASTER();
    this.copyData = item;
    console.log('20181024');
    console.log(item);
    this.addData(this.copyData);
  }
  public getFinBank(pCompanyID: string) {
    this.programService
      .getFinBank(pCompanyID)
      .subscribe(
        (response: Array<FIN_BANK>) => { this.finbank = response; },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  public getCurrency() {
    this.programService
      .getCurrency()
      .subscribe(
        (response: Array<CURRENCY>) => {
          this.currency = response;
        },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  // 將前端資料欄位內容mapping(if)
  TradeVouUserMapping(item?: CASH_SETTLEMENT_MASTER) {
    const self = this;
    self.cTradeVouUser.forEach(function (x) {
      if (x.OPER_U_ID === item.TRADE_USER) {
        item.SETTLEMENT_USER = x.VOU_U_ID;
      }
    });
  }
  DpBankMapping(item: CASH_SETTLEMENT_MASTER) {
    const self = this;
    self.finbank.forEach(function (x) {
      if (x.BANK_CODE === item.DP_BANK) {
        item.FLEX_1 = x.BANK_DESC;
        console.log(item.FLEX_1);
      }
    });
  }


  // 剔除pipe Number,
  removeNumberPipeFormat(formatedNumber) {
    return formatedNumber.replace(/[$,]/g, '');
  }
  onlyNumbers(evt) {
    this.regularExpressionService.validateOnlyNumbers(evt);
  }
  XgetBuildingDetailContract(item: BUILDING_CONTRACT_MASTER) {
    item.KEY_NO = this.data.pKeyNO;
    this.programService.getBuildingContractDetailData(item)
      .subscribe(
        (response: any) => {
          // this.ngContractDetailData = response;
          // console.log(this.ngContractDetailData);
          // this.totalCount = response.length;
          // 利用kendo的dataquery進行group部門別
          // this.DivisionGroup = groupBy(this.UserDataFilter.data, [{ field: 'DIVISION' }]);
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  getUser() {
    this.userService
      .getCurrentUser().pipe(retry(15))
      .subscribe(
        (response: User) => {
          (this.currencyUserData = response);
        });
  }
  // 更新資料後跳出material snackBar
  updateSnackbar() {
    this.programService.openSnackBar('分機號碼與email', '已修改');
    this.dialogRef.close();
  }
  private HandleError(e: HttpErrorResponse): void {
    console.log(e);
    this.cm09005Service.HandleError(e);
  }
}



