import { Component, OnInit, ViewChild } from '@angular/core';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { RegularExpressionService } from '../../_services/regular-expression.service';
import { DateAdapter, NativeDateAdapter, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/Rx';
import { ProgramsService } from '../programs.service';
import { groupBy } from '@progress/kendo-data-query';
import { USERS } from '../../_model/USERS';
import { Observable } from 'rxjs/Rx';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { IntlModule } from '@progress/kendo-angular-intl';

// Load all required data for the bg locale
import '@progress/kendo-angular-intl/locales/bg/all';

// Load the required calendar data for the de locale
import '@progress/kendo-angular-intl/locales/de/calendar';
import { Export2ExcelService } from '../../_services/export2excel.service';
import { CASH_SETTLEMENT_MASTER } from '../../_model/CASH_SETTLEMENT_MASTER';
import { CASH_TRADE_EXCHANGE_BANK } from '../../_model/CASH_TRADE_EXCHANGE_BANK';
import { CM09005detailComponent } from './cm09005-detail/cm09005.component-detail';
import { CM09005dialogComponent } from './cm09005-dialog/cm09005.component-dialog';
import { CM09005Service } from './cm09005.service';
import { CURRENCY } from '../../_model/CURRENCY';
import { CASH_TRADE_VOU_USER } from '../../_model/CASH_TRADE_VOU_USER';
import { CASH_TRADE_MASTER } from '../../_model/CASH_TRADE_MASTER';
import { FIN_BANK } from '../../_model/FIN_BANK';
import { FinBankVM } from '../cm31010/FinBankVM';
import { CM09005pdfComponent } from './cm09005-pdf/cm09005.component-pdf';

@Component({
  selector: 'app-cm09005',
  templateUrl: './cm09005component.html',
  providers: [CM09005Service, FinDialogService
    // , { provide: LOCALE_ID, useValue: 'zh-TW' }
  ]

})
export class CM09005Component implements OnInit {
  // 定義呼叫dialog
  @ViewChild(CM09005dialogComponent)
  // 定義分頁
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // 定義排序
  @ViewChild(MatSort) sortTable: MatSort;

  // 定義接收users資料的物件
  public UserData = new MatTableDataSource<any>();
  // 定義接收filter過的users資料物件
  public UserDataFilter = new MatTableDataSource<any>();
  // 定義分頁總數預設為0
  public totalCount = 0;
  // 定義部門別資料物件
  public DivisionGroup;
  // 定義前端畫面所綁定之ngModel
  // public inputUser: UsersVM = new UsersVM();
  // 定義autocomplete所需物件
  filteredOptions: Observable<FIN_BANK[]>;
  myControl: FormControl = new FormControl();
  // 判斷pdf是否出現
  pdf_yn: Boolean = false;
  public SettleData = new MatTableDataSource<CASH_SETTLEMENT_MASTER>();
  public pSettleData: CASH_SETTLEMENT_MASTER = new CASH_SETTLEMENT_MASTER();
  public ngSettleData: CASH_SETTLEMENT_MASTER = new CASH_SETTLEMENT_MASTER();
  public nullSettleData: CASH_SETTLEMENT_MASTER = new CASH_SETTLEMENT_MASTER();
  public ngTradeBankData: Array<CASH_TRADE_EXCHANGE_BANK> = new Array<CASH_TRADE_EXCHANGE_BANK>();
  public ngTradeVouUser: Array<CASH_TRADE_VOU_USER> = new Array<CASH_TRADE_VOU_USER>();

  public currency: Array<CURRENCY> = new Array<CURRENCY>();

  public finbank: Array<FIN_BANK> = new Array<FIN_BANK>();
  options: FormGroup;
  public selectedRow;
  displayedColumns: string[] = ['COPY_BUTTON', 'PDF', 'SEQREF', 'TRADE_DATE', 'SETTLEMENT_DATE'
    // 'T1_SELL_CURRENCY', 'T1_SELL_AMT', 'T1_BUY_CURRENCY', 'T1_BUY_AMT', 'T1_SELL_EXCHANGE_RATE',
    // 'T2_BUY_CURRENCY', 'T2_BUY_AMT', 'T2_SELL_CURRENCY', 'T2_SELL_AMT', 'T2_BUY_EXCHANGE_RATE'
    , 'OP_BANK',
    'SETTLEMENT_CURRENCY', 'SETTLEMENT_AMT', 'DP_BANK', 'TRADE_USER', 'SETTLEMENT_USER', 'Detail'];
  constructor(
    private dd00002Service: CM09005Service,
    private programService: ProgramsService,
    private regularExpression: RegularExpressionService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private export2ExcelService: Export2ExcelService,
    private dialog: MatDialog// 關鍵一刻，呼叫Dialog必須放在建構子
  ) { }
  ngOnInit() {
    // 定義material datapicker語系
    this.dateAdapter.setLocale('zh-TW');
    // 預先載入users資料
    // this.getUser();
    // this.ngSettleData.SEQREF = '';
    // this.ngSettleData.SETTLEMENT_CURRENCY = this.ngSettleData.SETTLEMRNT_T1_CURRENCY;
    this.getSettlementData(this.ngSettleData);
    this.getCashTradeBankData();
    this.getCashTradeVouUser('EX'); // 交易人員
    this.getFinBank('YM'); // 存入銀行
    this.getCurrency();
    // autocomplete filter行為
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(val => this.finbank.filter(x => x.BANK_CODE.indexOf(val) >= 0))
    );
  }
  // // 得到users資料並塞入data table，塞入原始與filter後之物件
  // getUser() {
  //   this.dd00002Service.getUserData()
  //     .subscribe(
  //       (response: any) => {
  //         this.UserData.data = response;
  //         this.UserDataFilter.data = response;
  //         this.UserDataFilter.paginator = this.paginator;
  //         this.UserDataFilter.sort = this.sortTable;
  //         this.totalCount = response.length;
  //         // 利用kendo的dataquery進行group部門別
  //         this.DivisionGroup = groupBy(this.UserDataFilter.data, [{ field: 'DIVISION' }]);
  //       }
  //       , (error: HttpErrorResponse) => this.HandleError(error)
  //     );
  // }
  getSettlementData(item: CASH_SETTLEMENT_MASTER) {
    this.programService.getSettlementData(item)
      .subscribe(
        (response: any) => {
          this.SettleData.data = response;
          this.SettleData.data.forEach(x => {
            x.vTRADE_DATE = new Date(x.TRADE_DATE).toLocaleDateString();
            x.vSETTLEMENT_DATE = new Date(x.SETTLEMENT_DATE).toLocaleDateString();
          });
          this.SettleData.paginator = this.paginator;
          this.SettleData.sort = this.sortTable;
          this.totalCount = response.length;
          // 利用kendo的dataquery進行group部門別
          // this.DivisionGroup = groupBy(this.UserDataFilter.data, [{ field: 'DIVISION' }]);
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  // 打開detail視窗
  public openAddDialog(item: CASH_SETTLEMENT_MASTER
    , pTradeBank: Array<CASH_TRADE_EXCHANGE_BANK>, pCurrency: Array<CURRENCY>
    , pTradeVouUser: Array<CASH_TRADE_VOU_USER>, pflag: string): void {
    const dialogRef = this.dialog.open(CM09005detailComponent, {
      width: '1200px',
      data: { selectedItem: item, TradeBank: pTradeBank, Currency: pCurrency, TradeVouUser: pTradeVouUser, flag: pflag },
      disableClose: true // focus or not
    });
    // dialog關閉後可以觸發之動作
    dialogRef.afterClosed().subscribe(result => {
      this.getSettlementData(this.ngSettleData);
    });
  }
  getCashTradeBankData() {
    this.programService.getCashTradeBankData()
      .subscribe(
        (response: any) => {
          this.ngTradeBankData = response;
          console.log('1023');
          console.log(this.ngTradeBankData);
          // 利用kendo的dataquery進行group部門別
          // this.DivisionGroup = groupBy(this.UserDataFilter.data, [{ field: 'DIVISION' }]);
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  getCashTradeVouUser(pType: string) {
    this.programService.getTradVouUser(pType)
      .subscribe(
        (response: any) => {
          this.ngTradeVouUser = response;
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  // 將前端資料欄位內容mapping(if)
  TradeVouUserMapping(item?: CASH_SETTLEMENT_MASTER) {
    const self = this;
    // self.ngSettleData.TRADE_USER = item;
    self.ngTradeVouUser.forEach(function (x) {
      if (x.OPER_U_ID === item.TRADE_USER) {
        // self.ngSettleData.SETTLEMENT_USER = x.VOU_U_ID;
        item.SETTLEMENT_USER = x.VOU_U_ID;
        // console.log(self.ngSettleData.SETTLEMENT_USER);
      }
    });
  }

  public getCurrency() {
    this.programService
      .getCurrency()
      .subscribe(
        (response: Array<CURRENCY>) => { this.currency = response, console.log(this.currency); },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  public getFinBank(pCompanyID: string) {
    this.programService
      .getFinBank(pCompanyID)
      .subscribe(
        (response: Array<FIN_BANK>) => { this.finbank = response, console.log(this.finbank); },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  // autocomplete關鍵字搜尋變色
  highlightFiltered(countryName: string) {
    // 先綁定前端輸入值
    const inputCountry = countryName;
    return countryName.replace(
      inputCountry,
      `<font color="blue"><strong>${inputCountry}</strong></font>`
    );
  }
  // 依據條件改變顏色
  changeColor(item: any): string {
    if (item.DELETE_YN === 'Y') {
      return 'GREEN';
    }
  }
  // 依據條件顯示/不顯示停用icon
  deleteIcon(item: any): boolean {
    if (item.DELETE_YN === 'Y') {
      return true;
    } else if (item.DELETE_YN === 'N') {
      return false;
    }
  }
  // 更新資料後跳出material snackBar
  updateSnackbar() {
    this.programService.openSnackBar('分機號碼', '已修改');
  }
  // 開啟作廢警告提醒之功能
  public openCancelDialog(UserKey: number): void {
    console.log(UserKey);
    const dialogRef = this.dialog.open(CM09005dialogComponent, {
      width: '600px',
      data: { pUserKey: UserKey },
      disableClose: true // focus or not
    });
  }
  // 開啟PDF之功能
  public openPDF(item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(CM09005pdfComponent, {
      width: '600px',
      data: { pItem: item },
      disableClose: true // focus or not
    });
  }
  // 產生出excel
  public save2Excel(component) {
    console.log(component);
    if (component.data.length > 0) {
      this.export2ExcelService.export2ExcelFile(component);
    } else {
      this.programService.openSnackBar('請先查詢資料', '確認');
    }
  }
  // 利用Regex避免輸入空白
  public notSpace(event) {
    this.regularExpression.notSpace(event);
  }
  // http呼叫錯誤的處理
  private HandleError(e: any): void {
    this.dd00002Service.HandleError(e);
  }
}
