import { Component, OnInit, Inject, Input } from '@angular/core';
import { BUILDING_CONTRACT_DETAIL } from '../../../_model/BUILDING_CONTRACT_DETAIL';
import { HttpErrorResponse } from '@angular/common/http';
import { BUILDING_CONTRACT_MASTER } from '../../../_model/BUILDING_CONTRACT_MASTER';
import { AG00001Service } from '../ag00001.service';
import { ProgramsService } from '../../programs.service';
import { FinDialogService } from '../../../_services/fin-dialog/fin-dialog.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { User } from 'ym-ngapp-lib';

@Component({
  selector: 'app-ag00001-attach-detail',
  templateUrl: './ag00001-attach-detail.component.html'
})
export class Ag00001AttachDetailComponent implements OnInit {
  @Input() masterData: BUILDING_CONTRACT_MASTER;

  @Input() detailData: Array<BUILDING_CONTRACT_DETAIL> = new Array<BUILDING_CONTRACT_DETAIL>();
  @Input() currencyUserData: User;
  public newContractDetail: BUILDING_CONTRACT_DETAIL = new BUILDING_CONTRACT_DETAIL();
  public ngContractDetailData: Array<BUILDING_CONTRACT_DETAIL> = new Array<BUILDING_CONTRACT_DETAIL>();

  constructor(
    private ag00001Service: AG00001Service,
    public programService: ProgramsService,
    private dialogService: FinDialogService,
    // public dialogRef: MatDialogRef<Ag00001AttachDetailComponent>,
    // private dialog: MatDialog, // 關鍵一刻，呼叫Dialog必須放在建構子
    // @Inject(MAT_DIALOG_DATA) public data: any, // 接收從主頁面來的資料

  ) { }

  ngOnInit() {
    // this.ngContractDetailData = this.detailData;
    console.log(this.currencyUserData);
    // this.getBuildingContractDetail(this.masterData);
  }
  // 得到副約細節
  getBuildingContractDetail(item: BUILDING_CONTRACT_MASTER) {
    this.programService.getBuildingContractDetailData(item)
      .subscribe(
        (response: any) => {
          this.detailData = response;
        }
        , (error: HttpErrorResponse) => this.ag00001Service.HandleError(error)
      );
  }
  addEvent2TriData(item: BUILDING_CONTRACT_DETAIL, e: BUILDING_CONTRACT_MASTER) {
    console.log(e);
    item.F_KEY_NO = e.KEY_NO;
    item.CONTRACT_SEQREF = e.SEQREF;
    this.addDetailData(item);
    this.newContractDetail = new BUILDING_CONTRACT_DETAIL();
  }
  public addDetailData(addItem: BUILDING_CONTRACT_DETAIL) {
    const pCheck = this.checkDetail(addItem);
    if (pCheck === true) {
      addItem.IN_USER = this.currencyUserData.userID;
      this.ag00001Service.addBuildingContractDetail(addItem).subscribe(
        (x: any) => {
          console.log(x);
          this.programService.openSnackBar(x.CONTRACT_SEQREF, '已新增'),
            this.detailData.unshift(x);
        }, (error: HttpErrorResponse) => this.ag00001Service.HandleError(error));
    }
  }
  public TerminateDetailData(removeItem: BUILDING_CONTRACT_DETAIL) {
    this.ag00001Service.terminateBuildingContractDetail(removeItem.KEY_NO).subscribe(
      (x: any) => {
        this.programService.openSnackBar(x.CONTRACT_SEQREF, '已移除');
        const index = this.detailData.indexOf(removeItem);
        this.detailData.splice(index, 1);
      }, (error: HttpErrorResponse) => this.ag00001Service.HandleError(error));
  }
  public updateDetailData(updateItem: BUILDING_CONTRACT_DETAIL) {
    updateItem.UP_USER = this.currencyUserData.userID;
    this.ag00001Service.updateBuildingContractDetail(updateItem).subscribe(
      (x: BUILDING_CONTRACT_DETAIL) => {
        console.log(x);
        this.programService.openSnackBar(x.CONTRACT_SEQREF, '已更新');
      }, (error: HttpErrorResponse) => this.ag00001Service.HandleError(error));
  }
  checkDetail(item: BUILDING_CONTRACT_DETAIL) {
    if (item.CONTRACT_START_DATE == null || item.CONTRACT_END_DATE == null || item.CONTRACT_RENT == null) {
      this.dialogService.OpenDialogBox('請填入完整的租金內容');
      return false;
    } else {
      return true;
    }
  }
  public change2SumDetail(master: BUILDING_CONTRACT_MASTER, detail: BUILDING_CONTRACT_DETAIL) {
    this.ag00001Service.calculateSUMDetail(master, detail);
  }
}
