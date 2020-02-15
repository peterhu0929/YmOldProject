import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { FinDialogService } from '../../_services/fin-dialog/fin-dialog.service';
import { environment } from '../../../environments/environment';
import { CASH_SETTLEMENT_MASTER } from '../../_model/CASH_SETTLEMENT_MASTER';

@Injectable({
  providedIn: 'root',
})
export class CM09005Service {
  constructor(
    private http: HttpClient,
    private dialogService: FinDialogService,
  ) { }

  public addSettlmentData(item: CASH_SETTLEMENT_MASTER): Observable<CASH_SETTLEMENT_MASTER> {
    const url = environment.cashtest + '/Settle/AddSettlementData';
    console.log(url);
    return this.http.post<CASH_SETTLEMENT_MASTER>(url, item);
  }
  public updateCashSettlement(item: CASH_SETTLEMENT_MASTER): Observable<CASH_SETTLEMENT_MASTER> {
    const url = environment.cashtest + '/Settle/UpdateSettlementData';
    console.log(url);
    return this.http.put<CASH_SETTLEMENT_MASTER>(url, item);
  }
  // http呼叫錯誤處理
  public HandleError(e: any): void {
    console.log(e.error.Message);
    this.dialogService.OpenDialogBox(
      e.error.Message
    );
  }
}
