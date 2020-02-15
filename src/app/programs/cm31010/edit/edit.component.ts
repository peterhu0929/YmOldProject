import { ConsoleLogService } from '../../../_services/console-log.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Cm31010Service } from '../cm31010.service';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { Response } from '@angular/http/src/static_response';
import 'rxjs/Rx';
import { saveAs } from '@progress/kendo-file-saver/dist/es/save-as';
import { encodeBase64 } from '@progress/kendo-file-saver/dist/es/base64';
import { FinDialogService } from '../../../_services/fin-dialog/fin-dialog.service';
import { RecordGroup } from '../../../_model/RecordGroup';

import { FIN_BANK } from '../../../_model/FIN_BANK';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FIN_BANK_BAL } from '../../../_model/FIN_BANK_BAL';
import { Export2ExcelService } from '../../../_services/export2excel.service';
import { FinBankVM } from '../FinBankVM';

@Component({
  selector: 'app-cm31010-edit',
  templateUrl: './edit.component.html',
  providers: [Cm31010Service, FinDialogService, Export2ExcelService]
  // styleUrls: ['./cm31010.component.css']
})
export class Cm31010EditComponent implements OnInit {
  finbank: FIN_BANK[] = [];
  finbankbals: FIN_BANK_BAL[] = [];
  filteredResults: FIN_BANK[] = [];
  filteredResultsBankCode: FIN_BANK[] = [];
  // public inputrcbasparms: V_FIN_VOUCHER = new V_FIN_VOUCHER();
  company: Array<RecordGroup> = new Array<RecordGroup>();
  status: Array<RecordGroup> = new Array<RecordGroup>();
  voucher_type: Array<RecordGroup> = new Array<RecordGroup>();
  orignfilterValue: string;
  edit_yn: Boolean = false;
  pdf_yn: Boolean = false;
  // public data: V_FIN_VOUCHER[] = [];
  chk = false;
  selectedAll: Boolean = false;
  Today = new Date();
  public userInfoDatas;
  // public dataChecked: EDIChecked = new EDIChecked();
  pCompanyID: string;
  pBankCode: string;

  pBankDesc: string;
  public pFinBank: FinBankVM = new FinBankVM();
  public getXML;
  displayedColumns = ['BALDATE', 'PBAL', 'REVBAL', 'EXPBAL', 'BAL'];

  constructor(
    private cm31010Service: Cm31010Service,
    private log: ConsoleLogService,
    // private filterService: FilterService,
    // private regularExpression: RegularExpressionService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private dialogService: FinDialogService,
    private _route: ActivatedRoute,
    private location: Location,
    private export2ExcelService: Export2ExcelService
  ) { }

  ngOnInit() {
    this._route.queryParams.subscribe(
      x => (
        (this.pFinBank.COMPANY_ID = x['COMPANY_ID']), (this.pFinBank.BANK_CODE = x['BANK_CODE']), (this.pFinBank.BANK_DESC = x['BANK_DESC'])
      )
    );
    /**AllFinVoucher Data */
    this.cm31010Service
      .getFinBankBal(this.pFinBank.COMPANY_ID, this.pFinBank.BANK_CODE)
      .subscribe((x: Array<FIN_BANK_BAL>) => {
        this.finbankbals = x;
        // Scott支援將陣列撈回來的時間轉成Date
        this.finbankbals.map(y => {
          y.BALDATE = new Date(y.BALDATE);
          console.log(y);
        });
        // 一開始先全撈
        // this.filteredResults = this.finbankbals;
      });
    this.cm31010Service
      .getFinBankByfactor(this.pFinBank)
      .subscribe((x: any) => {
        this.finbank = x;
      });
  }
  /**回前頁 */
  goBack() {
    this.location.back();
  }
  public save2Excel(component) {
    this.export2ExcelService.export2ExcelFile(component);
    // this.export2ExcelService.exportMultipleSheetExcelFile(component);
  }
  private HandleError(e: any): void {
    this.cm31010Service.HandleError(e);
  }
}
