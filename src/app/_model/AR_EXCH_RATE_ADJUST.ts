export class AR_EXCH_RATE_ADJUST {
    public AGENT_CODE: string;
    public CNTRY_CODE: string;
    public CNTRY_NAME: string;
    public CURRENCY: string;
    public IN_USER: string;
    public EFF_DATE: Date;
    public EXP_DATE: Date;
    public IN_DATE: Date;
    public KEY_NO: number;
    public ADJUSTEDFACTOR: number;
    constructor() {
    this.AGENT_CODE = '';
    this.CNTRY_CODE = '';
    this.CNTRY_NAME = '';
    this.CURRENCY = '';
    this.IN_USER = '';
    this.EFF_DATE = new Date();
    this.EXP_DATE = new Date();
    this.IN_DATE = new Date();
    this.KEY_NO = 0;
    this.ADJUSTEDFACTOR = 0;
    }
}