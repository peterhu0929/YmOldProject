import {StockOption} from './StockOption';
import {StockOptionEmployee} from './StockOptionEmployee';

export class StockOptionEmployeeViewModel {
  public stockOptionEmployee:  StockOptionEmployee;
  public stockOption:  StockOption;
  public isModify: boolean;
  constructor() {
    this.stockOptionEmployee = new StockOptionEmployee();
    this.stockOption = new StockOption();
  }
}
