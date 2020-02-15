export class AR_AGENT_UM_CTRL {
  public KEY_NO: number;
  public UM_CODE: string;
  public ACCT_CODE: string;
  public ACCT_NAME: string;
  public AGENT_CODE: string;
  public AMT_TYPE: string; // 'Y:refundable,N:not refundable';
  public QC_US_AMT: number; //  '報收金額QC使用，幣別為美金';
  public VOY_CHK: string;
  public BL_CHK: string;
  public CNTR_CHK: string;
  public APPLICATION: string; //  'um code application';
  public DESCRIP: string;
  public REMARKS: string; // 'FR部門專用註記';
  public IN_USER: string;
  public UP_USER: string;
  public EXP_DATE: Date;
  public IN_DATE: Date;
  public UP_DATE: Date;

  constructor() {
    this.REMARKS = '';
    this.APPLICATION = '';
    this.VOY_CHK = '';
    this.BL_CHK = '';
    this.CNTR_CHK = '';
    this.UM_CODE = '';
    this.ACCT_CODE = '';
    this.ACCT_NAME = '';
    this.AGENT_CODE = '';
    this.IN_USER = '';
    this.UP_USER = '';
    this.AMT_TYPE = '';
    this.DESCRIP = '';
    this.EXP_DATE = new Date();
    this.IN_DATE = new Date();
    this.UP_DATE = new Date();
    this.QC_US_AMT = 0;
    this.KEY_NO = 0;
  }
}
