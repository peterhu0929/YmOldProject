export class AR_AGENT_EXCH_SWITCH {
  public AGENT_CODE: string;
  public CURRENCY: string;
  public CNTRY_NAME: string;
  public CNTRY_CODE: string;
  public ETD_ETA: string;
  public IN_USER: string;
  public UP_USER: string;
  public IN_DATE: Date;
  public UP_DATE: Date;
  public KEY_NO: number;
  public PRIOR_TO_ETD: number;
  constructor() {
  this.AGENT_CODE = '';
  this.CURRENCY = '';
  this.CNTRY_NAME = '';
  this.CNTRY_CODE = '';
  this.ETD_ETA = '';
  this.IN_USER = '';
  this.UP_USER = '';
  this.IN_DATE = new Date();
  this.UP_DATE = new Date();
  this.KEY_NO = 0;
  this.PRIOR_TO_ETD = 0;
  }
  }