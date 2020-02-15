import { Component, OnInit, ViewChild } from '@angular/core';
import { ConsoleLogService } from '../../_services/console-log.service';


import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { RecordGroup } from '../../_model/RecordGroup';
import { RegularExpressionService } from '../../_services/regular-expression.service';
import { DateAdapter, NativeDateAdapter, MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';
import { EDIChecked } from '../../_model/EDI_CHECKED';
import { Response } from '@angular/http/src/static_response';
import 'rxjs/Rx';
import { saveAs } from '@progress/kendo-file-saver/dist/es/save-as';
import { encodeBase64 } from '@progress/kendo-file-saver/dist/es/base64';
import { ResultModel } from '../../_model/ResultModel';
import { ProgramsService } from '../programs.service';

import { DIVISION } from './DIVISION';
import { groupBy } from '@progress/kendo-data-query';
import { USERS } from '../../_model/USERS';
import { UsersVM } from './UsersVM';
import { Observable } from 'rxjs/Rx';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { CM21010dialogComponent } from './cm21010-dialog/cm21010.component-dialog';
import { CM21010Service } from './cm21010.service';
import { CURRENCY } from '../../_model/CURRENCY';
@Component({
  selector: 'app-cm21010',
  templateUrl: './cm21010.component.html',
  providers: [CM21010Service, FinDialogService]

})
export class CM21010Component implements OnInit {
  @ViewChild(CM21010dialogComponent)
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('sortTable') sortTable: MatSort;
  filteredResults: UsersVM[] = [];
  public UserData = new MatTableDataSource<any>();
  public UserDataFilter = new MatTableDataSource<any>();
  public CurrencyDataFilter = new MatTableDataSource<any>();
  public CurrencyData = new MatTableDataSource<any>();
  public totalCount = 0;
  public DivisionGroup;
  public inputCurrency: CURRENCY = new CURRENCY();
  filteredOptions: Observable<UsersVM[]>;
  myControl: FormControl = new FormControl();


  constructor(
    private cm21010Service: CM21010Service,
    private programService: ProgramsService,
    private log: ConsoleLogService,
    // private filterService: FilterService,
    private regularExpression: RegularExpressionService,
    private dateAdapter: DateAdapter<NativeDateAdapter>,
    private dialogService: FinDialogService,
    private dialog: MatDialog// 關鍵一刻，必須放在建構子
  ) { }
  ngOnInit() {
    /**畫面查詢條件初始值 */
    this.dateAdapter.setLocale('zh-TW');
    // this.getUser();
    this.getCurrency();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      map(val => this.CurrencyData.data.filter
        (x => x.CURR_DESC !== undefined && x.CURR_DESC != null && x.CURR_DESC.indexOf(val) >= 0))
    );
  }
  getUser() {
    this.cm21010Service.getUserData()
      .subscribe(
        (response: any) => {
          this.UserData.data = response;
          this.UserDataFilter.data = response;
          // this.UserDataFilter.paginator = this.paginator;
          // this.UserDataFilter.sort = this.sortTable;
          // this.totalCount = response.length;
          this.DivisionGroup = groupBy(this.UserDataFilter.data, [{ field: 'DIVISION' }]);
        }
        , (error: HttpErrorResponse) => this.HandleError(error)
      );
  }
  deleteUser(item: UsersVM) {
    console.log(item);
  }

  getCurrency() {
    this.programService.getCurrency().subscribe((response: any) => {
      this.CurrencyDataFilter.data = response;
      this.CurrencyData.data = response;
      this.CurrencyDataFilter.paginator = this.paginator;
      this.totalCount = response.length;
    }, (error: HttpErrorResponse) => this.HandleError(error));
  }
  updateCurrency(item: CURRENCY) {
    console.log(this.inputCurrency);
    this.programService.updateCurrency(item).subscribe(
      (response: CURRENCY) => {
        this.programService.openSnackBar(response.CURR_CD + '-' + response.CURR_DESC, '已更新'),
          console.log(response);
      },
      (error: HttpErrorResponse) => this.HandleError(error));
  }
  highlightFiltered(countryName: string) {
    const inputCountry = this.inputCurrency.CURR_DESC;
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
  updateSnackbar() {
    this.programService.openSnackBar('分機號碼', '已修改');
  }
  /*
  public filterChangedDataTable(inputFilterValue: string) {
    // this.log.WriteLog(inputFilterValue); // 欲filter之條件
    if (inputFilterValue && this.UserData) {
      inputFilterValue = inputFilterValue.toUpperCase();
      const props = ['CURR_DESC'];
      this.CurrencyDataFilter.data = this.filterService.filter<any>(
        this.CurrencyData.data,
        inputFilterValue,
        props
      );
      console.log(this.UserDataFilter.data);
    } else {
      this.CurrencyDataFilter.data = this.CurrencyData.data;
    }
  }*/

  public openCancelDialog(UserKey: number): void {
    console.log(UserKey);
    const dialogRef = this.dialog.open(CM21010dialogComponent, {
      width: '600px',
      data: { pUserKey: UserKey },
      disableClose: false // focus or not
    });
  }
  public notSpace(event) {
    this.regularExpression.notSpace(event);
  }
  private HandleError(e: any): void {
    this.cm21010Service.HandleError(e);
  }
}
