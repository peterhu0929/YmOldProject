import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsoleLogService } from '../../_services/console-log.service';
import { Cm31010Service } from './cm31010.service';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { RecordGroup } from '../../_model/RecordGroup';
import { RegularExpressionService } from '../../_services/regular-expression.service';
import { DateAdapter, NativeDateAdapter, MatDialog, MatTabChangeEvent, MatSnackBar } from '@angular/material';
// import { V_FIN_VOUCHER } from './V_FIN_VOCHER';
import { HttpErrorResponse } from '@angular/common/http';
import { EDIChecked } from '../../_model/EDI_CHECKED';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/Rx';
import { saveAs } from '@progress/kendo-file-saver/dist/es/save-as';
import { encodeBase64 } from '@progress/kendo-file-saver/dist/es/base64';
import { ResultModel } from '../../_model/ResultModel';
import { FIN_BANK } from '../../_model/FIN_BANK';
import { ActivatedRoute, Router } from '@angular/router';
import { FIN_BANK_BAL } from '../../_model/FIN_BANK_BAL';
import {
  NgControl,
  FormControl,
  FormControlName,
  FormGroup
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { Export2ExcelService } from '../../_services/export2excel.service';
import { Cm31010WAddComponent } from './cm31010w-add/CM31010W.component-add';
import { ProgramsService } from '../programs.service';
import { CASH_CODE } from '../../_model/CASH_CODE';
import { FinBankVM } from './FinBankVM';
import { CURRENCY } from '../../_model/CURRENCY';

@Component({
  selector: 'app-cm31010',
  templateUrl: './cm31010.component.html',
  providers: [Cm31010Service, FinDialogService]
  // styleUrls: ['./cm31010.component.css']
})
export class Cm31010Component implements OnInit {
  @ViewChild(Cm31010WAddComponent)
  private cm31010waddComponent: Cm31010WAddComponent;
  finbanks: FinBankVM[] = [];
  filteredResults: FinBankVM[] = [];
  filteredResultsBankCode: FIN_BANK[] = [];
  public newFinBank: FinBankVM = new FinBankVM();

  company: Array<RecordGroup> = new Array<RecordGroup>();
  status: Array<RecordGroup> = new Array<RecordGroup>();
  voucher_type: Array<RecordGroup> = new Array<RecordGroup>();
  currency: Array<CURRENCY> = new Array<CURRENCY>();
  orignfilterValue: string;
  edit_yn: Boolean = false;
  pdf_yn: Boolean = false;
  update_yn: Boolean = true;
  disabled_yn: Boolean = true;
  // public data: V_FIN_VOUCHER[] = [];
  chk = false;
  selectedAll: Boolean = false;
  Today = new Date();
  public userInfoDatas;
  public dataChecked: EDIChecked = new EDIChecked();
  xmledi: string;
  parm: string;
  spaceFinBank: FIN_BANK;
  myControl: FormControl = new FormControl();
  surveyForm: FormGroup;
  filteredOptions: Observable<FinBankVM[]>;
  // finvouchersID: FIN_VOUCHER[] = [];
  // EDI_yn: Boolean = false;
  indextest;
  // public EDIVoucher: V_FIN_VOUCHER = new V_FIN_VOUCHER();
  public pFinBank: FinBankVM = new FinBankVM();
  banktype: Array<CASH_CODE> = new Array<CASH_CODE>();
  constructor(
    private cm31010Service: Cm31010Service,
    private log: ConsoleLogService,
    private regularExpression: RegularExpressionService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private dialogService: FinDialogService,
    private _route: ActivatedRoute,
    private _router: Router,
    private export2ExcelService: Export2ExcelService,
    private dialog: MatDialog,
    public snackBar: MatSnackBar,
    private programservice: ProgramsService
  ) {
    // window.onbeforeunload = function () {
    //   return '★★ 您尚未將編輯過的表單資料送出，請問您確定要離開網頁嗎？ ★★';
    // };
    // const thiswindow = this;

    // window.onbeforeunload = function (e: any) {
    //   e.returnValue = null;
    // };

  }
  ngOnInit() {
    /**畫面查詢條件初始值 */
    this.dateAdapter.setLocale('zh-TW');
    this.pFinBank.COMPANY_ID = 'YM';
    // this.pFinBank.COMPANY_ID = this.EDIVoucher.COMPANY_ID;
    // this.pFinBank.BANK_DESC = '測試';
    this.userInfoDatas = JSON.parse(localStorage.getItem('currentUser'));

    /**AllCompany Dropdownlist */
    this.programservice
      .getCompany('KELHUANG')
      .subscribe(
        (response: Array<RecordGroup>) => (this.company = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    /**AllFinVoucherStatus Dropdownlist */
    this.programservice
      .getStatus()
      .subscribe(
        (response: Array<RecordGroup>) => (this.status = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    /**AllFinVoucherType Dropdownlist */
    this.programservice
      .getVoucherType()
      .subscribe(
        (response: Array<RecordGroup>) => (this.voucher_type = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    this.programservice
      .getBankType()
      .subscribe(
        (response: Array<CASH_CODE>) => (this.banktype = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    this.programservice
      .getCurrency()
      .subscribe(
        (response: Array<CURRENCY>) => (this.currency = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    /**AllFinVoucher Data */
    // this.cm31010Service.getFinBankByfactor(this.pFinBank).subscribe((x: any) => {
    //   this.finbanks = x;
    //   // 一開始先全撈
    //   this.filteredResults = x;
    // });
    // autocomplete filter
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(val => this.finbanks.filter(x => x.BANK_DESC.indexOf(val) >= 0))
    );
    // console.log(this.indextest);
  }

  // 20180423修正
  public getFinBankDataBankCode(pFinBank: FinBankVM) {
    if (pFinBank.BANK_CODE != null && pFinBank.BANK_CODE.length > 1) {
      this.cm31010Service.getFinBankByfactor(pFinBank).subscribe((x: any) => {
        // 銀行下拉式選單
        this.finbanks = x;
        // 一開始先全撈
        this.filteredResults = x;
        this.filteredResults.map(y => {
          y.EFF_DATE = new Date(y.EFF_DATE);
          if (y.EXP_DATE != null) {
            y.EXP_DATE = new Date(y.EXP_DATE);
          }
        });
        // console.log(this.finbanks);
        this.pFinBank.BANK_DESC = '';
      });
    } else {
      this.openSnackBar('請輸入至少2碼', '確認');
    }
  }

  // 20180423修正
  public getFinBankDataBankDesc(pFinBank: FinBankVM) {
    if (pFinBank.BANK_DESC != null && pFinBank.BANK_DESC.length > 1) {
      this.cm31010Service.getFinBankByfactor(pFinBank).subscribe((x: any) => {
        // x.EFF_DATE = new Date(x.EFF_DATE);
        // x.EXP_DATE = new Date(x.EXP_DATE);
        console.log(x);
        // 銀行下拉式選單
        this.finbanks = x;
        // 一開始先全撈
        this.filteredResults = x;
        this.filteredResults.map(y => {
          y.EFF_DATE = new Date(y.EFF_DATE);
          if (y.EXP_DATE != null) {
            y.EXP_DATE = new Date(y.EXP_DATE);
          }
        });
        // console.log(this.finbanks);
        this.pFinBank.BANK_CODE = '';
        // this.save2Excel(component);
        // console.log(component);
        // this.getFinBankDatabyBankDesc(component, pFinBank);
      });
    } else {
      this.openSnackBar('請輸入至少2碼', '確認');
    }
  }

  // 20180423修正
  public XgetFinBankDatabyBankDesc(component, pFinBank: FinBankVM) {
    this.cm31010Service.getFinBankByfactor(pFinBank).subscribe((x: any) => {
      // 銀行下拉式選單
      // this.finbanks = x;
      // 一開始先全撈
      // this.filteredResults = x;
      this.save2Excel(component);
    });
  }
  public getFinBankDataOne(pCompanyID: string, pBankCpde: string) {
    this.cm31010Service.getFinBankByfactorOne(pCompanyID, pBankCpde).subscribe((x: any) => {
      // 銀行下拉式選單
      this.finbanks = x;
      // 一開始先全撈
      this.filteredResults = x;
      this.filteredResults.map(y => {
        y.EFF_DATE = new Date(y.EFF_DATE);
        if (y.EXP_DATE != null) {
          y.EXP_DATE = new Date(y.EXP_DATE);
        }
      });
    });
  }
  tolog(a: any) {
    // console.log('---------20180418');
    // console.log(a);
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      // horizontalPosition: 'right'
    });
  }
  // tabFocusChange($event: MatTabChangeEvent) {
  //   console.log(`focus變更，indx：${$event.index}`);
  // }
  // refreshData() {
  //   this.cm31010Service.getFinBank().subscribe((x: FIN_BANK[]) => {
  //     this.finbanks = x;
  //     this.filteredResults = this.finbanks;
  //     // this.QueryByInput();
  //     this.log.WriteLog('有刷新');
  //   });
  // }
  UpdateData(data: FinBankVM) {
    console.log(data.EFF_DATE);
    this.cm31010Service.Update(data).subscribe((response) => {
      this.dialogService.OpenDialogBox('Update Success');
    }, (error: Error) => { this.cm31010Service.HandleError(error); });
  }

  public test() {
    // this.getFinBankData(this.pFinBank);
    this.openSnackBar(this.pFinBank.COMPANY_ID, 'OK');
  }

  addEmpty() {
    const item = new FinBankVM();
    item.IN_USER = 'PETER.CH.HU';
    item.IN_DATE = this.Today;
    item.COUNTRY = 'AU';
    this.cm31010Service.getFinBankByfactor(this.pFinBank).subscribe((x: any) => {
      this.finbanks = x;
      // 一開始先全撈
      this.filteredResults = x;
      // this.QueryByInput();
      this.filteredResults.unshift(item);
    });
  }



  public openAddDialog(): void {
    const dialogRef = this.dialog.open(Cm31010WAddComponent, {
      width: '600px',
      data: { pCompayID: this.newFinBank.COMPANY_ID, pBankCode: this.newFinBank.BANK_CODE },
      disableClose: false // focus or not
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.getFinBankData(result.newfinbank);
      console.log(result.pCompayID);
      console.log(result.pBankCode);

      if (result.pCompayID !== undefined || result.pBankCode !== undefined) {
        this.getFinBankDataOne(result.pCompayID, result.pBankCode);
        this.pFinBank.BANK_CODE = result.pBankCode;
        this.pFinBank.BANK_DESC = '';
      }
      console.log('The dialog was closed');

    });
  }

  highlightFiltered(countryName: string) {
    const inputCountry = this.pFinBank.BANK_DESC;
    return countryName.replace(
      inputCountry,
      `<font color="blue"><strong>${inputCountry}</strong></font>`
    );
  }
  /*
    public filterChangedFinBankBankCode(inputFilterValue: string) {
      // this.log.WriteLog(inputFilterValue); // 欲filter之條件
      if (inputFilterValue && this.filteredResultsBankCode) {
        inputFilterValue = inputFilterValue.toUpperCase();
        const props = ['BANK_CODE'];
        // this.log.WriteLog(this.finvouchers.length);
        this.filteredResults = this.filterService.filter<FinBankVM>(
          this.finbanks,
          inputFilterValue,
          props
        );
        console.log(inputFilterValue);
        // this.filteredResults.push(this.spaceFinBank);//下拉式選單塞空值
        this.orignfilterValue = inputFilterValue; // 塞輸入值給後面重新filter用
      } else {
        this.filteredResults = this.filteredResults;
        // inputFilterValue = this.orignfilterValue;
      }
    }*/

  viewDetail(data: FIN_BANK) {
    // console.log(data);
    this._router.navigate(['/cm31010EDIT'], {
      queryParams: { COMPANY_ID: data.COMPANY_ID, BANK_CODE: data.BANK_CODE, BANK_DESC: data.BANK_DESC }
    });
  }

  GenCurrentTimeFileName() {
    this.Today = new Date();
    const Month = (this.Today.getMonth() + 1).toString();
    const sysdate =
      this.Today.getFullYear().toString() +
      Month +
      this.Today.getDate().toString() +
      this.Today.getHours().toString() +
      this.Today.getMinutes().toString() +
      this.Today.getSeconds().toString();
    const fileName = sysdate + '.txt';
    return fileName;
  }
  public directSave2Excel(component, pFinBank: FinBankVM) {
    // this.getFinBankDataBankDesc(component, pFinBank);
    // this.export2ExcelService.export2ExcelFile(component);
  }
  public save2Excel(component) {
    console.log(component);
    if (component.data.length > 0) {
      this.export2ExcelService.export2ExcelFile(component);
    } else {
      this.openSnackBar('請先查詢銀行資料', '確認');
    }
  }
  public notSpace(event) {
    this.regularExpression.notSpace(event);
  }
  private HandleError(e: any): void {
    this.cm31010Service.HandleError(e);
  }
}
