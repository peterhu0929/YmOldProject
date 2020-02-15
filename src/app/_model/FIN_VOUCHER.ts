export class FIN_VOUCHER {
  public id: number; //  id
  public KEY_NO: number; //  Primary Key
  public YEAR: string; //  傳票年度
  public MONTH: string; //  傳票月份
  public COMPANY_ID: string; //  公司類別
  public PROSTATUS: string; //  執行狀態
  public C_DEPT_ID: string; //  會計開立部門
  public V_DEPT_ID: string; //  出納開立部門
  public VTYPE: string; //  傳票類別
  public CRENO_YEAR: string; //  現金製票年度(會計部製票年度)
  public CRENO: string; //  現金製票號碼(會計部製票號碼)
  public CREDATE: Date; //  會計產生日期
  public CREMAKER: string; //  會計人員
  public VOUNO: string; //  現金傳票號碼(會計部傳票號碼)
  public VDATE: Date; //  傳票日期(出納)
  public VMAKER: string; //  出納人員
  public LR: string; //  借貸
  public BOCURR: string; //  記帳幣別
  public BOUSEX: number; //  記帳幣兌美金匯率
  public BOAMT: number; //  記帳幣金額
  public DOCNUM: number; //  Document Number
  public ITYPE: string; //  文件輸入方式(繳/受款人資料表達方式為 1-見附件清單, 3-其他 ,應填其他資料)
  public ARDATA: string; //  傳票摘要
  public DRPRT: string; //
  public CRPRT: string; //
  public DPDATE: Date; //  付款日期
  public TSFR_GLS_USERID: string; //  轉進總帳 ILIS ID
  public TSFR_GLS_DATE: Date; //  轉進總帳日期
  public IN_USER: string; //
  public IN_DATE: Date; //
  public UP_USER: string; //
  public UP_DATE: Date; //
  public C_DIVISION: string; //  會計人員組別代碼
  public PRINT_CNT: number; //
  public JOB_ID: number; //  JOB_ID, for job control...
  public SYS_FROM: string; //  財務部分析帳務類別用
  public POST_SW: string; //  是否過帳
  public POST_DATE: Date; //  過帳日期
  public POST_UID: string; //  過帳者
  // public EDI_SW: Boolean;
}
