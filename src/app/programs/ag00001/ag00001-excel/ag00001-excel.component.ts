import { Component, OnInit, Input } from '@angular/core';
import { BUILDING_CONTRACT_MASTER } from '../../../_model/BUILDING_CONTRACT_MASTER';

@Component({
  selector: 'app-ag00001-excel',
  templateUrl: './ag00001-excel.component.html',
  styleUrls: ['./ag00001-excel.component.scss']
})
export class Ag00001ExcelComponent implements OnInit {
  @Input() ContractData = new Array<BUILDING_CONTRACT_MASTER>();
  @Input() totalCount = 0;
  @Input() SUM_YEAR_RENT_AMT = 0;
  constructor() { }

  ngOnInit() {
  }

}
