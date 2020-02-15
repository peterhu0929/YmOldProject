import { Component, OnInit, ViewChild } from '@angular/core';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { RegularExpressionService } from '../../_services/regular-expression.service';
import { DateAdapter, NativeDateAdapter, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs/Rx';
import { ProgramsService } from '../programs.service';
import { DIVISION } from './DIVISION';
import { groupBy, aggregateBy } from '@progress/kendo-data-query';
import { USERS } from '../../_model/USERS';
import { UsersVM } from './UsersVM';
import { Observable } from 'rxjs/Rx';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

import { IntlModule } from '@progress/kendo-angular-intl';

// Load all required data for the bg locale
import '@progress/kendo-angular-intl/locales/bg/all';

// Load the required calendar data for the de locale
import '@progress/kendo-angular-intl/locales/de/calendar';
import { Export2ExcelService } from '../../_services/export2excel.service';
import { BUILDING_CONTRACT_MASTER } from '../../_model/BUILDING_CONTRACT_MASTER';
import { AG00001detailComponent } from './ag00001-detail/ag00001.component-detail';
import { AG00001dialogComponent } from './ag00001-dialog/ag00001.component-dialog';
import { AG00001Service } from './ag00001.service';
import { BUILDING_CONTRACT_DETAIL } from '../../_model/BUILDING_CONTRACT_DETAIL';
import { trigger, state, transition, style, animate } from '@angular/animations';
import { Ag00001UploadComponent } from './ag00001-upload/ag00001-upload.component';
import { isNull } from 'util';
import { Ag00001AttachDetailComponent } from './ag00001-attach-detail/ag00001-attach-detail.component';
import { User, UserService } from 'ym-ngapp-lib';
import { Ag00001PdfComponent } from './ag00001-pdf/ag00001-pdf.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-ag00001',
  templateUrl: './ag00001.component.html',
  providers: [AG00001Service, FinDialogService],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],

})
export class AG00001Component implements OnInit {
  // 定義呼叫dialog
  @ViewChild(AG00001dialogComponent)
  // 定義分頁
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // 定義排序
  @ViewChild(MatSort) sortTable: MatSort;

  public ssrsUrl = environment.ssrsURL;
  // 定義接收users資料的物件
  public UserData = new MatTableDataSource<any>();
  // 定義接收filter過的users資料物件
  public UserDataFilter = new MatTableDataSource<any>();
  // 定義分頁總數預設為0
  public totalCount = 0;
  // 定義部門別資料物件
  public DivisionGroup;
  // 定義前端畫面所綁定之ngModel
  public inputUser: UsersVM = new UsersVM();
  // 定義autocomplete所需物件
  filteredOptions: Observable<UsersVM[]>;
  myControl: FormControl = new FormControl();
  // registerForm: FormGroup;
  // submitted = false;
  // 判斷pdf是否出現
  pdf_yn: Boolean = false;
  detail_yn = false;
  public tabIndex = 0;
  public SUM_AMT;
  public ContractDataFilter = new MatTableDataSource<BUILDING_CONTRACT_MASTER>();
  public ContractDataSelected = new MatTableDataSource<BUILDING_CONTRACT_MASTER>();
  public ngContractData: BUILDING_CONTRACT_MASTER = new BUILDING_CONTRACT_MASTER();
  public ngContractDetailData: Array<BUILDING_CONTRACT_DETAIL> = new Array<BUILDING_CONTRACT_DETAIL>();
  public newContractDetail: BUILDING_CONTRACT_DETAIL = new BUILDING_CONTRACT_DETAIL();
  public imgURL: Array<string> = new Array();
  public currencyUserData: User;
  public selectedMasterData: BUILDING_CONTRACT_MASTER = new BUILDING_CONTRACT_MASTER();
  public selectedRow;
  public expandedElement;
  displayedColumns: string[] = ['EDIT_BUTTON', 'DELETE_BUTTON', 'DELETE_YN', 'SEQREF', 'CITY',
    'BUILDING_NAME', 'RENTED_START_DATE', 'RENTED_END_DATE',
    'AREA_UNIT', 'RENTED_AREA', 'WORKING_AREA', 'COMMON_AREA', 'OTHER_AREA',
    'CURR', 'UNIT_RENT', 'MONTH_RENT',
    'UNIT_MANAGE_FEE', 'MONTH_MANAGE_FEE', 'CAR_SPACE_AMT', 'UNIT_RENT_CAR_SPACE',
    'MONTH_RENT_CAR_SPACE', 'ADJ_RENT_METHOD', 'RENTED_AREA_P', 'MONTH_RENT_AMT', 'Detail'];
  displayedDetailColumns: string[] = ['SUB_COMPANY_NAME', 'LOC_DISTRICT', 'BUILDING_TOT_FLOOR',
    'BUILDING_RENTED_FLOOR', 'BUILDING_AGE', 'SEAT_CAPACITY', 'SEAT_ACTUAL_PEOPLE', 'AVG_WORKING_AREA', 'DEPOSIT',
    'RENOVATE_UNIT', 'RENOVATE_FEE', 'UNIT_RENOVATE_FEE', 'RENOVATE_YEAR', 'EXCHANGE_RATE',
    'YEAR_RENT_AMT', 'STATE_AREA', 'COUNTRY', 'CITY', 'CAPITAL_AMT'];


  columnsToDisplay: string[] = ['EDIT_BUTTON', 'DELETE_BUTTON', 'DELETE_YN', 'SEQREF',
    'CITY', 'BUILDING_NAME', 'RENTED_START_DATE', 'RENTED_END_DATE',
    'AREA_UNIT', 'RENTED_AREA', 'WORKING_AREA', 'COMMON_AREA', 'OTHER_AREA',
    'CURR', 'UNIT_RENT', 'MONTH_RENT',
    'UNIT_MANAGE_FEE', 'MONTH_MANAGE_FEE', 'CAR_SPACE_AMT', 'UNIT_RENT_CAR_SPACE',
    'MONTH_RENT_CAR_SPACE', 'ADJ_RENT_METHOD', 'RENTED_AREA_P', 'MONTH_RENT_AMT',
    'Detail', 'SUB_COMPANY_NAME', 'LOC_DISTRICT', 'BUILDING_TOT_FLOOR',
    'BUILDING_RENTED_FLOOR', 'BUILDING_AGE', 'SEAT_CAPACITY', 'SEAT_ACTUAL_PEOPLE', 'AVG_WORKING_AREA', 'DEPOSIT',
    'RENOVATE_UNIT', 'RENOVATE_FEE', 'UNIT_RENOVATE_FEE', 'RENOVATE_YEAR', 'EXCHANGE_RATE',
    'YEAR_RENT_AMT', 'STATE_AREA', 'COUNTRY', 'CITY', 'CAPITAL_AMT'];
  constructor(
    private ag00001Service: AG00001Service,
    private programService: ProgramsService,
    private userService: UserService,
    private regularExpressionService: RegularExpressionService,
    private dialogService: FinDialogService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private export2ExcelService: Export2ExcelService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog, // 關鍵一刻，呼叫Dialog必須放在建構子
    // private formBuilder: FormBuilder
  ) { }
  ngOnInit() {
    // 定義material datapicker語系
    this.dateAdapter.setLocale('zh-TW');
    const culture = navigator.language;
    console.log(culture);
    this.getCurrencyUser();
    // autocomplete filter行為
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(val => this.UserDataFilter.data.filter(x => x.USR_NAME !== undefined && x.USR_NAME != null && x.USR_NAME.indexOf(val) >= 0))
    );
    this.getBuildingContract(this.ngContractData);
  }
  getCurrencyUser() {
    this.userService
      .getCurrentUser()
      .subscribe(
        (response: User) => {
          (this.currencyUserData = response);
          console.log(this.currencyUserData);
          // this.dialogService.OpenDialogBox(JSON.stringify(response));
        },
        (error: HttpErrorResponse) => {
          this.HandleError(error);
        }
      );
  }
  public ToSafeUrl(url: string) {
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getBuildingContract(item: BUILDING_CONTRACT_MASTER) {
    this.programService.getBuildingContractData(item)
      .subscribe(
        (response: any) => {
          this.ContractDataFilter.data = response;
          // 20181130 test fake data
          this.ContractDataFilter.data.forEach(x => {
            x.FLEX_5 = this.programService.transferBoolean2View(x.FLEX_5)
            x.vRENTED_START_DATE = new Date(x.RENTED_START_DATE).toLocaleDateString();
            x.vRENTED_END_DATE = new Date(x.RENTED_END_DATE).toLocaleDateString();
          });
          this.ContractDataFilter.paginator = this.paginator;
          this.ContractDataFilter.sort = this.sortTable;
          this.totalCount = response.length;
          this.ContractDataSelected = new MatTableDataSource<BUILDING_CONTRACT_MASTER>();
          this.ngContractData.SELF_ASSET = '';
          this.GetSum();
          this.detail_yn = false;
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  getBuildingContractByMonths(pMonths: number) {
    this.programService.getBuildingContractDataByMonths(pMonths)
      .subscribe(
        (response: any) => {
          this.ContractDataFilter.data = response;
          this.ContractDataFilter.data.forEach(x => {
            x.FLEX_5 = this.programService.transferBoolean2View(x.FLEX_5)
            x.vRENTED_START_DATE = new Date(x.RENTED_START_DATE).toLocaleDateString();
            x.vRENTED_END_DATE = new Date(x.RENTED_END_DATE).toLocaleDateString();
          });
          this.ContractDataFilter.paginator = this.paginator;
          this.ContractDataFilter.sort = this.sortTable;
          this.totalCount = response.length;
          this.GetSum();
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  // 得到副約細節
  getBuildingContractDetail(item: BUILDING_CONTRACT_MASTER) {
    this.programService.getBuildingContractDetailData(item)
      .subscribe(
        (response: any) => {
          this.ngContractDetailData = response; this.detail_yn = true;
          console.log(this.ngContractDetailData);
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  getImgURL(pMasterData: BUILDING_CONTRACT_MASTER) {
    this.ag00001Service.getImgURL(pMasterData)
      .subscribe(
        (response: any) => {
          this.imgURL = new Array();
          this.imgURL = response;
        }
        , (error: HttpErrorResponse) => this.imgURL = new Array()
      );
  }
  deleteImg(pImgURL: string) {
    this.ag00001Service.terminateImgURL(pImgURL)
      .subscribe(
        (response: any) => {
          this.programService.openSnackBar(response, '');
          //找到刪除的那筆是位在陣列中的第幾筆
          const index = this.imgURL.indexOf(pImgURL);
          //然後把它刪掉，直接反應在前端顯示的圖片內容
          this.imgURL.splice(index, 1);
        }
        , (e: HttpErrorResponse) => this.dialogService.OpenDialogBox(e.error)
      );
  }
  // tabClick(tab, selectItem: BUILDING_CONTRACT_MASTER) {
  //   console.log(tab.index);
  //   if (tab.index === 1) {
  //   this.detail_yn = true;
  //   console.log(selectItem);
  //   this.getBuildingContractDetail(selectItem);
  //   }
  // }
  GetSum() {
    // 只抓沒有被刪除的資料
    // const SumResults = this.ContractDataFilter.data.filter(x => x.DELETE_FLAG === 'N');
    this.SUM_AMT = aggregateBy(this.ContractDataFilter.data,
      [{ field: 'YEAR_RENT_AMT', aggregate: 'sum' },
      ]);
    this.ngContractData.SUM_YEAR_RENT_AMT = this.SUM_AMT.YEAR_RENT_AMT.sum;
  }
  public updateDetailData(updateItem: BUILDING_CONTRACT_DETAIL) {
    this.ag00001Service.updateBuildingContractDetail(updateItem).subscribe(
      (x: any) => {
        console.log(x);
        this.programService.openSnackBar(x.KEY_NO, '已更新');
      }, (error: HttpErrorResponse) => this.HandleError(error));
  }
  // 打開detail視窗
  public openAddDialog(Data?: any): void {
    const dialogRef = this.dialog.open(AG00001detailComponent, {
      width: '1100px',
      data: { pData: Data, pUser: this.currencyUserData },
      disableClose: true // focus or not
    });
    // dialog關閉後可以觸發之動作
    dialogRef.afterClosed().subscribe(result => {
      this.getBuildingContract(this.ngContractData);
      console.log('The dialog was closed');
    });
  }
  // 打開detail視窗
  public openUploadDialog(Data?: any): void {
    const dialogRef = this.dialog.open(Ag00001UploadComponent, {
      width: '800px',
      data: { pData: Data },
      disableClose: false // focus or not
    });
    // dialog關閉後可以觸發之動作
    dialogRef.afterClosed().subscribe(result => {
      this.getBuildingContract(this.ngContractData);
      console.log('The dialog was closed');
    });
  }

  applyFilter(filterValue: string) {
    this.ContractDataFilter.filter = filterValue.trim().toLowerCase();
  }

  // autocomplete關鍵字搜尋變色
  highlightFiltered(countryName: string) {
    // 先綁定前端輸入值
    const inputCountry = this.inputUser.USR_NAME;
    return countryName.replace(
      inputCountry,
      `<font color="blue"><strong>${inputCountry}</strong></font>`
    );
  }
  // 依據條件改變顏色
  changeColor(item: BUILDING_CONTRACT_MASTER): string {
    if (item.STATUS === '-100') {
      return 'BLUE';
    }
  }
  // 依據條件顯示/不顯示停用icon
  deleteIcon(item: BUILDING_CONTRACT_MASTER): boolean {
    if (item.STATUS === '-100') {
      return true;
    } else {
      return false;
    }
  }
  // 更新資料後跳出material snackBar
  updateSnackbar() {
    this.programService.openSnackBar('分機號碼', '已修改');
  }
  // 開啟作廢警告提醒之功能
  public openCancelDialog(Data: any): void {
    // console.log(Data);
    const dialogRef = this.dialog.open(AG00001dialogComponent, {
      width: '600px',
      data: { pData: Data },
      disableClose: false // focus or not
    });
    dialogRef.afterClosed().subscribe(result => {
      // this.getBuildingContract(this.ngContractData);
      // console.log('The dialog was closed');
    });
  }
  // 開啟PDF之功能
  public openPDF(item: any): void {
    console.log(item);
    const dialogRef = this.dialog.open(Ag00001PdfComponent, {
      width: '2000px',
      height: '1500px',
      data: { pItem: item },
      disableClose: false // focus or not
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
  public openSSRS() {
    window.open(environment.ssrsURL);
  }
  // http呼叫錯誤的處理
  private HandleError(e: any): void {
    this.ag00001Service.HandleError(e);
  }
}
