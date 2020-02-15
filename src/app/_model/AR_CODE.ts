export class AR_CODE {
  public CODE_TYPE: string;
  public CODE: string;
  public SUB_CODE: string;
  public DESCRIPTION: string;
  public REMARK: string;
  public EXPIRE: string;
  public IN_USER: string;
  public UP_USER: string;
  public IN_DATE: Date;
  public UP_DATE: Date;
  public KEY_NO: number;
  constructor() {
    this.CODE_TYPE = '';
    this.CODE = '';
    this.SUB_CODE = '';
    this.DESCRIPTION = '';
    this.REMARK = '';
    this.EXPIRE = '';
    this.IN_USER = '';
    this.UP_USER = '';
    this.IN_DATE = new Date();
    this.UP_DATE = new Date();
    this.KEY_NO = 0;
  }
}
