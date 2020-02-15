export class AR_UM_ACCOUNTING_MAP {
  // AR_UM_ACCOUNTING_MAP'UM CODE 和會計科目的對應，可針對個別代理行設定';
  public KEY_NO: number;
  public UM_KEY: number; // 'AR_AGENT_UM_CTRL.KEY_NO';
  public UM_CODE: string;
  public AGN_AC_CODE: string; // 'AR_AGN_ACCT.AGN_AC_CODE';
  public ACCT_CODE: string; // 'ACCOUNT.ACCT';
  public ACCT_NAME: string; // 'ACCOUNT.ACCT_NAME';
  public ACTIVE_SW: string; // '是否生效,Y:有效,N:無效';
  public IN_USER: string;
  public UP_USER: string;
  public IN_DATE: Date;
  public UP_DATE: Date;
  public FLEX_1: string;
  public FLEX_2: string;
  public FLEX_3: string;
  public FLEX_4: string;
  public FLEX_5: string;
  public FLEX_6: number;
  public FLEX_7: number;
  public FLEX_8: number;
  public FLEX_9: number;
  public FLEX_10: number;
  constructor() {
    this.UM_CODE = '';
    this.AGN_AC_CODE = '';
    this.ACCT_CODE = '';
    this.ACCT_NAME = '';
    this.IN_USER = '';
    this.UP_USER = '';
    this.ACTIVE_SW = '';
    this.FLEX_1 = '';
    this.FLEX_2 = '';
    this.FLEX_3 = '';
    this.FLEX_4 = '';
    this.FLEX_5 = '';
    this.IN_DATE = new Date();
    this.UP_DATE = new Date();
    this.KEY_NO = 0;
    this.UM_KEY = 0;
    this.FLEX_6 = 0;
    this.FLEX_7 = 0;
    this.FLEX_8 = 0;
    this.FLEX_9 = 0;
    this.FLEX_10 = 0;
  }
}
