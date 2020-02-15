export class AR_AGN_ACCT {
  public AGN_AC_CODE: string; //  Agent Account Code
  public AGN_NAME: string; //  Agent Name
  public AGN_EN_NAME: string; //  Agent English Name
  public AGN_CURR: string; //  Agent Local Currency (當地幣別)
  public BANK_AC_CODE: string; //  Bani Account Code (報收代碼)
  public CNTRY_CODE: string; //
  public DMDT_COUNTRY: string; //  FOR DM/DT COUNTRY CODE
  public LFC_ID: string; //  LFC FILE A卡中A02欄位--Sender 的Code Master(SA_AR_LFC_QC 會利用此欄位檢查A02欄位)
  public LFC_VER: string; //  LFC VERSION
  public LFC_SOURCE: string; //  LFC STATUS
  public FIELD_FLEX1: string; //  是否為收支互抵 Y:是 N:否
  public FIELD_FLEX2: string; //
  public FIELD_FLEX3: string; //
  public FIELD_FLEX4: string; //
  public FIELD_FLEX5: string; //
  public PAYPLACE: string; //
  public SUB_CODE: string; //  關係人交易使用
  public VALID: string; //  If still valid?Y: Valid  N: Not Valid
  public IN_USER: string; //
  public IN_DATE: Date; //
  public UP_USER: string; //
  public UP_DATE: Date; //
  public Area: string; // from AR_LFC_CONFIRM_ACCT.AREA
  public PicUser: string; //  from AR_LFC_CONFIRM_ACCT.PROCESS_UID
  public PicUserName: string; //  from AR_LFC_CONFIRM_ACCT.ProcessUserName
  public SubCodeName: string; //  關係人名稱
  public ValidFlag: boolean; //  If still valid?Y: Valid  N: Not Valid
}
