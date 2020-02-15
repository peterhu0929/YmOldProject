import { Component, OnInit } from '@angular/core';
import { ConsoleLogService } from '../../_services/console-log.service';
import { Cm31070Service } from './cm31070.service';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { RecordGroup } from '../../_model/RecordGroup';
import { RegularExpressionService } from '../../_services/regular-expression.service';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { V_FIN_VOUCHER } from './V_FIN_VOCHER';
import { HttpErrorResponse } from '@angular/common/http';
import { EDIChecked } from '../../_model/EDI_CHECKED';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/Rx';
import { saveAs } from '@progress/kendo-file-saver/dist/es/save-as';
import { encodeBase64 } from '@progress/kendo-file-saver/dist/es/base64';
import { ResultModel } from '../../_model/ResultModel';
import { ProgramsService } from '../programs.service';

@Component({
  selector: 'app-cm31070',
  templateUrl: './cm31070.component.html',
  providers: [Cm31070Service, FinDialogService]
  // styleUrls: ['./cm31070.component.css']
})
export class Cm31070Component implements OnInit {
  finvouchers: V_FIN_VOUCHER[] = [];
  filteredResults: V_FIN_VOUCHER[] = [];
  public inputrcbasparms: V_FIN_VOUCHER = new V_FIN_VOUCHER();
  company: Array<RecordGroup> = new Array<RecordGroup>();
  status: Array<RecordGroup> = new Array<RecordGroup>();
  voucher_type: Array<RecordGroup> = new Array<RecordGroup>();
  orignfilterValue: string;
  edit_yn: Boolean = false;
  pdf_yn: Boolean = false;
  public data: V_FIN_VOUCHER[] = [];
  chk = false;
  selectedAll: Boolean = false;
  Today = new Date();
  public userInfoDatas;
  public dataChecked: EDIChecked = new EDIChecked();

  public getXML;
  xmledi: string;

  // finvouchersID: FIN_VOUCHER[] = [];
  // EDI_yn: Boolean = false;
  public EDIVoucher: V_FIN_VOUCHER = new V_FIN_VOUCHER();
  constructor(
    private cm31070Service: Cm31070Service,
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
    this.EDIVoucher.CRENO_YEAR = this.Today.getFullYear().toString();
    this.EDIVoucher.PROSTATUS = 'VOUCHER';
    this.EDIVoucher.VTYPE = 'CP';
    this.EDIVoucher.V_DEPT_ID = 'MF';
    // this.EDIVoucher.VDATE_FROM = this.thisYear;
    const msDateToday = new Date(this.Today);
    msDateToday.setDate(msDateToday.getDate() - 40);
    this.EDIVoucher.VDATE_FROM = msDateToday;
    this.EDIVoucher.VDATE_TO = this.Today;
    // this.userInfoDatas = JSON.parse(localStorage.getItem('currentUser'));
    // this.log.WriteLog('1111' + this.userInfoDatas.USER_ID);
    /**AllCompany Dropdownlist */
    this.programsService
      .getCompany('EDWARDYANG')
      .subscribe(
        (response: Array<RecordGroup>) => (this.company = response),
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
    /**AllFinVoucher Data */
    // this.cm31070Service.getFinVoucher().subscribe((x: any) => {
    //   this.finvouchers = x;
    // });
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
  QueryByCompany(value?: string) {
    // this.filterChanged(this.company_value);
    // const para: V_FIN_VOUCHER = new V_FIN_VOUCHER();
    // para.COMPANY_ID = this.EDIVoucher.COMPANY_ID;
    // para.CRENO_YEAR = this.EDIVoucher.CRENO_YEAR;
    // para.PROSTATUS = this.EDIVoucher.PROSTATUS;
    // para.CRENO = this.EDIVoucher.CRENO;
    // para.VOUNO = this.EDIVoucher.VOUNO;
    // para.VDATE_FROM = this.EDIVoucher.VDATE_FROM;
    // para.VDATE_TO = this.EDIVoucher.VDATE_TO;
    // para.VTYPE = this.EDIVoucher.VTYPE;
    // para.V_DEPT_ID = 'MF';
    // this.log.WriteLog(para.CRENO);
    this.cm31070Service
      .getFinVoucherByQuery(this.EDIVoucher)
      .subscribe(
        (x: any) => (this.finvouchers = x),
        (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  GenEDI() {
    this.cm31070Service.genEDIforBOA(this.dataChecked).subscribe(
      (x: any) => {
        this.downloadFile(x);
      },
      (error: HttpErrorResponse) => this.HandleError(error)
    );
    // console.log('XML below');
    // console.log(this.getXML);
  }
  GenEDItest() {
    this.downloadFile('test work');
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
  downloadFile(data: any) {
    // const mediaType = 'application/txt';
    // const blob = new Blob([data.blob()], { type: mediaType });
    // const filename = 'project.txt';
    // saveAs(blob, filename); // FileSaver.js libray
    // /**KENDO */
    // const dataURI = 'data:text/plain;base64,' + encodeBase64(data);
    // saveAs(dataURI, 'test1116.txt');
    // console.log(data);
    // console.log(dataURI);
    // console.log(this.xmledi);
    /**Web Reference */
    // this.getXML = data;

    // const fileName = this.sysdate + '.txt';
    // const blob = new Blob([data], { type: 'text/csv' });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = fileName;
    // a.click();
    this.cm31070Service.downloadTxt(data, this.GenCurrentTimeFileName());
    this.dialogService.OpenDialogBox(
      this.GenCurrentTimeFileName() + '下載完成'
    );
    // window.open(url, fileName);
    // window.URL.revokeObjectURL(url);

    // console.log(data);
    // console.log(blob);
    // console.log(url);
  }
  public notSpace(event) {
    this.regularExpression.notSpace(event);
  }
  private HandleError(e: any): void {
    this.cm31070Service.HandleError(e);
  }

  blob2str(bb?: any) {
    const reader = new FileReader();
    // This fires after the blob has been read/loaded.
    reader.addEventListener('loadend', e => {
      const text = e.srcElement;
      console.log(text);
    });

    // Start reading the blob as text.
    reader.readAsText(bb);
  }
}
