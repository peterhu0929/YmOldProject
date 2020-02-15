import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { toDataSourceRequestString } from '@progress/kendo-data-query';
// import { ilisEnvironment } from '../../environments/environment';

export abstract class GridWebAPIService extends BehaviorSubject<GridDataResult> {
  constructor(private _http: Http, private _tableName: string) {
    super(null);
  }

  public query(state: any): void {
    this.fetch(this._tableName, state)
      .subscribe(x => super.next(x));
  }

  private fetch(tableName: string, state: any): Observable<GridDataResult> {
    const queryStr = `${toDataSourceRequestString(state)}&$count=true`;

    return this._http
      .get(`api/${tableName}/GridRead?${queryStr}`)
      .map(response => response.json())
      .map(response => (<GridDataResult>{
        data: response.Data,
        total: response.Total
      }));
  }
}
