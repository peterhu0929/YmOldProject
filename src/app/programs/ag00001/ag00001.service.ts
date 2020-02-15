import { Injectable, LOCALE_ID } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FinDialogService } from './../../_services/fin-dialog/fin-dialog.service';
import { UsersVM } from './UsersVM';
import { ConsoleLogService } from './../../_services/console-log.service';
import { BUILDING_CONTRACT_MASTER } from '../../_model/BUILDING_CONTRACT_MASTER';
import { environment } from '../../../environments/environment';
import { BUILDING_CONTRACT_DETAIL } from '../../_model/BUILDING_CONTRACT_DETAIL';
import { User, UserService } from 'ym-ngapp-lib';

@Injectable({
  providedIn: 'root',
})
export class AG00001Service {

  constructor(
    private http: HttpClient,
    private dialogService: FinDialogService,
    private userService: UserService,

  ) { }
  getCurrencyUser(currencyUserData: User) {
    this.userService
      .getCurrentUser()
      .subscribe(
        (response: User) => {
          (currencyUserData = response);
          console.log(currencyUserData);
        },
        (error: HttpErrorResponse) => {
          this.HandleError(error);
        }
      );
  }
  public terminateBuildingContract(KEY_NO: number): Observable<BUILDING_CONTRACT_MASTER> {
    const url = environment.cashtest + '/AG/TerminateBuildingContract?KeyNO=' + KEY_NO;
    console.log(url);
    return this.http.put<BUILDING_CONTRACT_MASTER>(url, KEY_NO);
  }
  public terminateBuildingContractDetail(KEY_NO: number): Observable<BUILDING_CONTRACT_DETAIL> {
    const url = environment.cashtest + '/AG/TerminateBuildingContractDetailData?KeyNO=' + KEY_NO;
    console.log(url);
    return this.http.put<BUILDING_CONTRACT_DETAIL>(url, KEY_NO);
  }
  public terminateImgURL(filePath: string): Observable<String> {
    const url = environment.cashtest + '/AG/DeleteUploadImage?imgURL=' + filePath;
    console.log(url);
    return this.http.get<String>(url);
  }
  public addBuildingContract(item: BUILDING_CONTRACT_MASTER): Observable<BUILDING_CONTRACT_MASTER> {
    const url = environment.cashtest + '/AG/AddBuildingContractData';
    console.log(url);
    return this.http.post<BUILDING_CONTRACT_MASTER>(url, item);
  }
  public updateBuildingContract(item: BUILDING_CONTRACT_MASTER): Observable<BUILDING_CONTRACT_MASTER> {
    const url = environment.cashtest + '/AG/UpdateBuildingContractData';
    console.log(url);
    return this.http.put<BUILDING_CONTRACT_MASTER>(url, item);
  }
  public addBuildingContractDetail(item: BUILDING_CONTRACT_DETAIL): Observable<BUILDING_CONTRACT_DETAIL> {
    const url = environment.cashtest + '/AG/AddBuildingContractDetailData';
    console.log(url);
    return this.http.post<BUILDING_CONTRACT_DETAIL>(url, item);
  }
  public updateBuildingContractDetail(item: BUILDING_CONTRACT_DETAIL): Observable<BUILDING_CONTRACT_DETAIL> {
    const url = environment.cashtest + '/AG/UpdateBuildingContractDetailData';
    console.log(url);
    return this.http.put<BUILDING_CONTRACT_DETAIL>(url, item);
  }

  // 計算邏輯
  calculateSUM(item: BUILDING_CONTRACT_MASTER) {
    item.RENTED_AREA = item.WORKING_AREA + item.COMMON_AREA + item.OTHER_AREA;
    item.UNIT_RENT = item.MONTH_RENT / item.RENTED_AREA;

    if (item.AREA_UNIT === 'SM') {
      item.RENTED_AREA_P = item.RENTED_AREA * 0.3025;
    }
    if (item.AREA_UNIT === 'SF') {
      item.RENTED_AREA_P = item.RENTED_AREA * 0.0929 * 0.3025;
    }
    item.UNIT_MANAGE_FEE = item.MONTH_MANAGE_FEE / item.RENTED_AREA;
    item.UNIT_RENT_CAR_SPACE = item.MONTH_RENT_CAR_SPACE / item.CAR_SPACE_AMT;
    item.RENOVATE_FEE_TWD = item.RENOVATE_FEE * item.EXCHANGE_RATE;
    item.UNIT_RENOVATE_FEE = item.RENOVATE_FEE_TWD / item.RENTED_AREA_P;
    item.AVG_WORKING_AREA = item.RENTED_AREA_P / item.SEAT_ACTUAL_PEOPLE;
    item.MONTH_RENT_AMT = item.MONTH_RENT * item.EXCHANGE_RATE;
    item.YEAR_RENT_AMT = item.MONTH_RENT_AMT * 12;
  }
  calculateSUMDetail(master: BUILDING_CONTRACT_MASTER, detail: BUILDING_CONTRACT_DETAIL) {
    detail.CONTRACT_MONTH_RENT_TWD = detail.CONTRACT_MONTH_RENT_ORAMT * master.EXCHANGE_RATE;
    detail.CONTRACT_RENT = detail.CONTRACT_MONTH_RENT_ORAMT / master.RENTED_AREA;
    detail.CONTRACT_MONTH_RENT_TWD = this.mathRound(detail.CONTRACT_MONTH_RENT_TWD);
    detail.CONTRACT_RENT = this.mathRound(detail.CONTRACT_RENT);
  }
  mathRound(n: number) {
    n = Math.round(n * 100) / 100;
    // n.toFixed(2);
    return n;
  }
  MultipleUpload(SEQREF: string, file: File): Observable<Object> {
    const formData: FormData = new FormData();
    formData.append('avatar', file, SEQREF + '_' + file.name);
    let myparams = new HttpParams();
    myparams = myparams.set('SEQREF', SEQREF);
    const url = environment.cashtest + '/AG/FileUpload';
    return this.http.post(url, formData, { params: myparams });
  }
  HttpFilesUpload(SEQREF: string, files: FormData): Observable<any> {
    // console.log('上傳之資料');
    // console.log(files);
    let myparams = new HttpParams();
    myparams = myparams.set('SEQREF', SEQREF);
    const url = environment.cashtest + '/AG/FileUpload';
    return this.http.post<ErrorInfoProp[]>(url, files, { params: myparams, reportProgress: true, observe: 'events' });
  }
  public getImgURL(item: BUILDING_CONTRACT_MASTER): Observable<any> {
    let myparams = new HttpParams();
    myparams = myparams.set('SEQREF', item.SEQREF);
    const url = environment.cashtest + '/AG/GetUploadImage';
    console.log(url);
    return this.http.get<any>(url, { params: myparams });
  }
  // http呼叫錯誤處理
  public HandleError(e: any): void {
    console.log(e.error.Message);
    this.dialogService.OpenDialogBox(
      e.error.Message
    );
  }
}
export interface ErrorInfoProp {
  fileName: string;
  status: string;
  errorMsg: string;
}
