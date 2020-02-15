import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ProgramCatalog } from '../../_model/menu';
import { ProgramsService } from '../programs.service';
import { retry, retryWhen, delay, take } from 'rxjs/operators';
import { UserService } from 'ym-ngapp-lib';


@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.css']
})
export class CashComponent implements OnInit {
  private _pgName: any;
  public sumNum = 0;
  public retryNum = 0;
  url = '';
  constructor(
    private _route: ActivatedRoute,
    private userService: UserService,
    private http: HttpClient,
    private programService: ProgramsService,
  ) { }

  ngOnInit(): void {
    this.getWebProgam();
  }

  getWebProgam() {
    this.userService.getCurrentUser().pipe(retryWhen(errors => errors.pipe(delay(500), take(15))
    )).subscribe(
      x => {
        this._route.data.forEach((data: any) => {
          this._pgName = data['pgName'];
          if (data['pgType'].toString() === 'W') {
            this.url = environment.webformDomain + data['url'] + '?user_id=' + x.userID + '&KNO=' + data['keyNo'].toString();
            this.programService.openSnackBar(this.url.toString(), 'webForm');
            console.log('x');
            console.log(x);
            console.log('webForm data');
            console.log(data);
          } else {
            this.http.get
              (environment.mvcDomain + 'api/ILISSession/SetSessionData?userId=' + x.userID + '&moudle=' + 'ILIS', { withCredentials: true })
              .subscribe(
                y => {
                  console.log(y);
                  this.url = environment.mvcDomain + data['url'];
                  this.programService.openSnackBar(this.url.toString(), 'M');
                }
              );
          }
        });
      }
    );
  }
}
