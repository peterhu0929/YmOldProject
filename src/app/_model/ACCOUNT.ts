export class ACCOUNT {
  public VSL: string;
  public VOY: string;
  public MANIFEST: string;
  public CTN_NO: string;
  public CY_Y_N: string;
  public YARD_ID: string;
  public LINE: string;
  public KIND_OF_CASE: string;
  public FREE_DAY_DM: string;
  public FREE_DAY_DT: string;
  public USER1: string;
  public USER2: string;
  public USER3: string;
  public CONSIGNEE: string;
  public BL_NO: string;
  public ACCT_FLEX_1: string;
  public ACCT_FLEX_2: string;
  public ACCT_FLEX_3: string;
  public ACCT_FLEX_4: string;
  public ACCT_FLEX_5: string;
  public ACCT_FLEX_6: string;
  public ACCT_FLEX_7: string;
  public ACCT_FLEX_8: string;
  public ACCT_FLEX_9: string;
  public ACCT_FLEX_10: string;
  public ACCT_TYPE: string;
  public EVALUATE_TYPE: string;

  public CCY: string;
  public ACCT: string;
  public ACCT_NAME: string;
  public IN_USER: string;
  public UP_USER: string;
  public ICP_CODE: string;
  public ICP_SW: string;

  public DESCRIPTION: string;
  public START_DATE: Date;
  public IN_DATE: Date;
  public UP_DATE: Date;
  public ACCOUNTDATE: Date;
  public LASTUPDATED: Date;
  public RANK: number;
  public ACCOUNTID: number;
  public ACCTEMPLATEID: number;
  public ACCOUNTVALUE: number;
  public PERIODID: number;
  public DEPTID: number;
  public EXPORTMARKER: number;
  constructor() {
    this.VSL = '';
    this.VOY = '';
    this.MANIFEST = '';
    this.CTN_NO = '';
    this.CY_Y_N = '';
    this.YARD_ID = '';
    this.LINE = '';
    this.KIND_OF_CASE = '';
    this.FREE_DAY_DM = '';
    this.FREE_DAY_DT = '';
    this.USER1 = '';
    this.USER2 = '';
    this.USER3 = '';
    this.CONSIGNEE = '';
    this.BL_NO = '';
    this.ACCT_FLEX_6 = '';
    this.ACCT_FLEX_7 = '';
    this.ACCT_FLEX_8 = '';
    this.ACCT_FLEX_9 = '';
    this.ACCT_FLEX_10 = '';
    this.ACCT_TYPE = '';
    this.EVALUATE_TYPE = '';
    this.ACCT_FLEX_1 = '';
    this.ACCT_FLEX_2 = '';
    this.ACCT_FLEX_3 = '';
    this.CCY = '';
    this.ACCT = '';
    this.ACCT_NAME = '';
    this.IN_USER = '';
    this.UP_USER = '';
    this.ICP_CODE = '';
    this.ICP_SW = '';
    this.ACCT_FLEX_4 = '';
    this.ACCT_FLEX_5 = '';
    this.DESCRIPTION = '';
    this.START_DATE = new Date();
    this.IN_DATE = new Date();
    this.UP_DATE = new Date();
    this.ACCOUNTDATE = new Date();
    this.LASTUPDATED = new Date();
    this.RANK = 0;
    this.ACCOUNTID = 0;
    this.ACCTEMPLATEID = 0;
    this.ACCOUNTVALUE = 0;
    this.PERIODID = 0;
    this.DEPTID = 0;
    this.EXPORTMARKER = 0;
  }
}
