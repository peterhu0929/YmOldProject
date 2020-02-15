export class FIN_VOU_MAIN {
  public KEY_NO: number;     //  Primary Key
  public F_KEY_NO: number;     //  FIN_VOUHCER.KEY_NO
  public SEQ: string;     //  SEQUENCE NO ( FROM 899)
  public BANK_CODE: string;     //  銀行代碼 (FIN_BANKBANK_CODE)
  public BANK_ORUSEX: number;     //  銀行幣別對美金匯率
  public BANK_ORAMT: number;     //  銀行幣別金額
  public ORCURR: string;     //  原幣別
  public ORUSEX: number;     //  原幣對美金匯率
  public ORAMT: number;     //  原幣金額
  public BOAMT: number;     //  記帳幣金額
  public IN_USER: string;     //
  public IN_DATE: Date;     //
  public UP_USER: string;     //
  public UP_DATE: Date;     //
  public DELETE_YN: string;     //
  public CHKNO: string;     //  支票號碼或電匯單號碼
  public NEW_YN: string;     //
  public V_PAYDATE: Date;     //
  public PRINT_CNT: number;     //  暫時不用
}
