import {USERS} from './USERS';
import {UserMenu} from './menu';

export class Session {
  public authenticationType: string;
  public module: string;
  public token: string;
  public user: USERS;
  public authorization: string;
  public menu: UserMenu;
  public isLiveText: string;
  constructor() {
    this.menu = new UserMenu();
    this.user = new USERS();
  }
}
