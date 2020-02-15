import { RC_MONTHLY_RENT } from './RC_MONTHLY_RENT';
import { RcRentDetailViewModel } from './RcRentDetailViewModel';
import { USERS } from './USERS';
export class RcMonthlyRentViewModel extends RC_MONTHLY_RENT {
  vdrName: string;
  user: USERS;
  detail: Array<RcRentDetailViewModel>;
  constructor() {
    super();
  }
}
