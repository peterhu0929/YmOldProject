import { Component, OnInit, Inject } from '@angular/core';
import { CM09005pdfComponent } from '../../cm09005/cm09005-pdf/cm09005.component-pdf';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProgramsService } from '../../programs.service';
import { BUILDING_CONTRACT_MASTER } from '../../../_model/BUILDING_CONTRACT_MASTER';

@Component({
  selector: 'app-ag00001-pdf',
  templateUrl: './ag00001-pdf.component.html',
  styleUrls: ['./ag00001-pdf.component.scss']
})
export class Ag00001PdfComponent implements OnInit {
  public pData: BUILDING_CONTRACT_MASTER = new BUILDING_CONTRACT_MASTER();
  constructor(
    public dialogRef: MatDialogRef<CM09005pdfComponent>, // 定義dialog問題
    @Inject(MAT_DIALOG_DATA) public data: any, // 接收從主頁面來的資料
    public programService: ProgramsService,
  ) { }

  ngOnInit() {
    this.pData = this.data.pItem;
    // console.log(this.pData);
  }

}
