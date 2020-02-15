import { RC_RENT_DETAIL } from './RC_RENT_DETAIL';

export class RcRentDetailViewModel extends RC_RENT_DETAIL {
  isSelected: boolean;
  validDateFrom: Date;
  validDateEnd: Date;
  constructor() {
    super();
  }
}
