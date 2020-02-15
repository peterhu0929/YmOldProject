import { Component, OnInit, Input } from '@angular/core';
import { ConsoleLogService } from '../../_services/console-log.service';
import { Cm09020Service } from './cm09020.service';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { RecordGroup } from '../../_model/RecordGroup';
import { RegularExpressionService } from '../../_services/regular-expression.service';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { V_FIN_VOUCHER } from './V_FIN_VOCHER';
import { HttpErrorResponse } from '@angular/common/http';
import { EDIChecked } from '../../_model/EDI_CHECKED';
import { CASH_TRADE_MASTER } from '../../_model/CASH_TRADE_MASTER';
import { CASH_TRADE_DETAIL } from '../../_model/CASH_TRADE_DETAIL';
import { FIN_VOUCHER } from '../../_model/FIN_VOUCHER';
import { MatTabChangeEvent } from '@angular/material/tabs/typings';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';
import { FIN_ACT_MAIN } from '../../_model/FIN_ACT_MAIN';
import { FIN_VOU_MAIN } from '../../_model/FIN_VOU_MAIN';
import { ProgramsService } from '../programs.service';



@Component({
  selector: 'app-cm09020',
  templateUrl: './cm09020.component.html',
  providers: [Cm09020Service, FinDialogService]
  // styleUrls: ['./cm09020.component.css']
})
export class Cm09020Component implements OnInit {
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<RecordGroup[]>;
  CashTradeMasters: Array<CASH_TRADE_MASTER> = new Array<CASH_TRADE_MASTER>();
  CashTradeMasterSelect: Array<CASH_TRADE_MASTER> = new Array<
    CASH_TRADE_MASTER
  >();
  FinVouchers: Array<FIN_VOUCHER> = new Array<FIN_VOUCHER>();
  FinActMain: Array<FIN_ACT_MAIN> = new Array<FIN_ACT_MAIN>();
  FinVouMain: Array<FIN_VOU_MAIN> = new Array<FIN_VOU_MAIN>();
  CashTradeDetails: Array<CASH_TRADE_DETAIL> = new Array<CASH_TRADE_DETAIL>();
  pCashTradeMasters: CASH_TRADE_MASTER = new CASH_TRADE_MASTER();
  pFinVouchers: FIN_VOUCHER = new FIN_VOUCHER();
  pSeqRef: string;
  finvouchers: V_FIN_VOUCHER[] = []; // Cancel
  filteredResults: V_FIN_VOUCHER[] = [];
  company: Array<RecordGroup> = new Array<RecordGroup>();
  status: Array<RecordGroup> = new Array<RecordGroup>();
  voucher_type: Array<RecordGroup> = new Array<RecordGroup>();
  orignfilterValue: string;
  edit_yn: Boolean = false;
  selectedAll: Boolean = false;
  Today = new Date();
  public userInfoDatas;
  public dataChecked: EDIChecked = new EDIChecked();
  public EDIVoucher: V_FIN_VOUCHER = new V_FIN_VOUCHER();
  public tabIndex;
  public tab_yn = false;
  constructor(
    private cm09020Service: Cm09020Service,
    private programsService: ProgramsService,
    private log: ConsoleLogService,
    // private filterService: FilterService,
    private regularExpression: RegularExpressionService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private dialogService: FinDialogService
  ) { }
  ngOnInit() {
    /**畫面查詢條件初始值 */
    this.dateAdapter.setLocale('zh-TW');
    this.EDIVoucher.COMPANY_ID = 'YM';
    this.pCashTradeMasters.YEAR_P1 = this.Today.getFullYear().toString();
    this.EDIVoucher.PROSTATUS = 'VOUCHER';
    this.EDIVoucher.VTYPE = 'CP';
    // this.EDIVoucher.VDATE_FROM = this.thisYear;
    const msDateToday = new Date(this.Today);
    msDateToday.setDate(msDateToday.getDate() - 40);
    this.EDIVoucher.VDATE_FROM = msDateToday;
    this.EDIVoucher.VDATE_TO = this.Today;
    this.userInfoDatas = JSON.parse(localStorage.getItem('currentUser'));
    // this.log.WriteLog('1111' + this.userInfoDatas.USER_ID);
    this.EDIVoucher.V_DEPT_ID = 'MF';
    // this.log.WriteLog(this.EDIVoucher.VDATE_FROM);
    // this.log.WriteLog(this.EDIVoucher.VDATE_TO);
    /**AllCompany Dropdownlist */
    this.programsService
      .getCompany('EDWARDYANG').subscribe
      ((response: Array<RecordGroup>) => { this.company = response; console.log(this.company); },
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    /**AllFinVoucherStatus Dropdownlist */
    this.programsService
      .getStatus()
      .subscribe(
        (response: Array<RecordGroup>) => (this.status = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    /**AllFinVoucherType Dropdownlist */
    this.programsService
      .getVoucherType()
      .subscribe(
        (response: Array<RecordGroup>) => (this.voucher_type = response),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    /**AllCashTradeMaster Data */
    // this.cm09020Service.getCashTradeMaster().subscribe((x: any) => {
    //   this.CashTradeMasters = x;
    // });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(val => this.company.filter(x => x.text.indexOf(val) >= 0))
    );
    // console.log(this.company);

  }

  /*filter(val: string): RecordGroup[] {
  //console.log(val);
  //return this.company.filter(x => x.text.indexOf(val) >= 0);
  }*/
  highlightFiltered(countryName: string) {
    const inputCountry = this.EDIVoucher.COMPANY_ID;
    return countryName.replace(
      inputCountry,
      `<font color="blue"><strong>${inputCountry}</strong></font>`
    );
  }
  viewDetail(DetailKey: CASH_TRADE_MASTER) {
    this.pCashTradeMasters.SEQREF = DetailKey.SEQREF;
    this.cm09020Service
      .getCashTradeDetail(DetailKey.KEY_NO)
      .subscribe((x: any) => {
        this.CashTradeDetails = x;
      });
    this.QueryByRequire();

    this.tabIndex = 1;
    // this.dialogService.OpenDialogBox(this.pSeqRef);
    console.log(this.pCashTradeMasters.SEQREF);
  }
  viewDetailByVoucher(DetailKey: CASH_TRADE_MASTER) {
    this.pFinVouchers.YEAR = DetailKey.YEAR_P1;
    this.pFinVouchers.CRENO = DetailKey.CRENO_Q1;
    this.cm09020Service
      .getFinVoucherByQuery(this.pFinVouchers)
      .subscribe((x: any) => {
        this.FinVouchers = x;
      });
    this.QueryByRequire();
    this.tabIndex = 2;
    console.log(this.pFinVouchers.CRENO);
  }
  tabFocusChange($event: MatTabChangeEvent) {
    console.log(`focus變更，indx：${$event.index}`);
  }
  Back2Master() {
    this.QueryByRequire();
    this.tabIndex = 0;
  }
  /**全選的方法，給前端selectAll mat-checkbox呼叫*/
  selectAll() {
    for (const i of this.finvouchers) {
      // this.log.WriteLog('1=>' + i.id);
      // this.EDIVoucher.KEY_NO = i.KEY_NO; // 全選的id
      // this.finvouchersID[i].id = this.finvouchers[i].id;
      i.EDI_SW = this.selectedAll; // 把matcheck的值拿去改欄位
      // this.log.WriteLog('1=>' + this.finvouchersID);
      // this.log.WriteLog('1=>' + this.selectedAll);
      // this.log.WriteLog('2=>' + i.id);
      this.log.WriteLog('this.selectedAll=>' + this.selectedAll);
    }
    this.checkIfAllSelected();
  }
  checkIfAllSelected() {
    this.selectedAll = this.finvouchers.every(function (item: any) {
      return item.selected === false;
    });
    // const datas: EDIChecked = new EDIChecked();
    const self = this;
    const edi = new EDIChecked();
    this.finvouchers.forEach(function (item) {
      if (item.EDI_SW) {
        edi.KEY_NO.push(item.KEY_NO);
      }
    });
    edi.USER_ID = self.userInfoDatas.USER_ID;
    // datas.push(edi);
    console.log(edi);
    this.dataChecked = edi;
    // this.log.WriteLog(this.dataChecked);
  }
  /**全撈後再filter(前端作業)
  public filterChanged(inputFilterValue: string) {
    // this.log.WriteLog(inputFilterValue); // 欲filter之條件
    if (inputFilterValue && this.finvouchers) {
      inputFilterValue = inputFilterValue.toUpperCase();
      const props = ['CRENO', 'COMPANY_ID'];
      // this.log.WriteLog(this.finvouchers.length);
      this.filteredResults = this.filterService.filter<V_FIN_VOUCHER>(
        this.finvouchers,
        inputFilterValue,
        props
      );
      this.orignfilterValue = inputFilterValue; // 塞輸入值給後面重新filter用
      // this.log.WriteLog(this.rcbasparms);// 欲filter之資料
      // this.log.WriteLog(inputFilterValue); // 欲filter之條件
      // this.log.WriteLog(this.filteredResults);// filter之結果
      // this.log.WriteLog(this.orignfilterValue);
      // this.data = this.filteredResults;
    } else {
      this.filteredResults = this.finvouchers;
      inputFilterValue = this.orignfilterValue;
    }
  }*/
  QueryByRequire(value?: string) {
    this.cm09020Service
      .getCashTradeMasterByQuery(this.pCashTradeMasters)
      .subscribe(
        (x: any) => (
          (this.CashTradeMasters = x), (this.CashTradeMasterSelect = x)
        ),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    this.tabIndex = 0;
    console.log(this.pCashTradeMasters);
  }
  QueryByFinVoucher() {
    this.cm09020Service
      .getFinVoucherByQuery(this.pFinVouchers)
      .subscribe(
        (x: any) => (
          (this.FinVouchers = x)
        ),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
    this.tabIndex = 2;
  }
  notSpace(event) {
    this.regularExpression.notSpace(event);
  }
  private HandleError(e: any): void {
    this.cm09020Service.HandleError(e);
  }
}
