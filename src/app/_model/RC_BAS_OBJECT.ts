export class RC_BAS_OBJECT {
  public KEY_NO: Number;
  public F_KEY_NO: Number;
  public TYPE_SW: string;
  public OBJ_CODE: string;
  public OBJ_NAME: string;
  public OBJ_TEL: string;
  public OBJ_ADDRESS: string;
  public IN_USER: string;
  public IN_DATE: Date = new Date();
  public UP_USER: string;
  public UP_DATE: Date = new Date();
  public OBJ_TYPE: string;
  public DIV_KEY: Number;
  public OBJ_FLEX_1: string;
  public OBJ_FLEX_2: string;
  public OBJ_FLEX_3: string;

  constructor() {
    this.KEY_NO = -1;
    this.TYPE_SW = 'N';
    this.OBJ_CODE = '';
    this.OBJ_NAME = '';
    this.OBJ_TEL = '';
    this.OBJ_ADDRESS = '';
    this.IN_USER = '';
    this.UP_USER = '';
    this.OBJ_TYPE = '';
    this.DIV_KEY = 0;
    this.OBJ_FLEX_1 = '';
    this.OBJ_FLEX_2 = '';
    this.OBJ_FLEX_3 = '';
  }

}

