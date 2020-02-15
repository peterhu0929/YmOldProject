export class FIN_ACT_MAIN {
  public KEY_NO: number;     //  Primary Key
  public F_KEY_NO: number;     //  FIN_VOUCHER.KEY_NO
  public SEGMENT_NO: string;     //  費用所屬部門
  public SEQ: string;     //  SEQUENCE NO
  public ACCTNUM: string;     //  會計科目
  public VESSEL: string;     //  舊船碼
  public VOYAGE: string;     //  新船碼
  public LPORT: string;     //
  public DPORT: string;     //
  public ORCURR: string;     //  原幣別
  public ORUSEX: number;     //  原幣兌美金匯率
  public LR: string;     //  借貸
  public ORAMT: number;     //  原幣金額
  public BOAMT: number;     //  記帳幣金額
  public OFFMRK: string;     //  沖銷註記
  public ACCTNUMO: string;     //  N/A
  public DESP: string;     //  摘要
  public PAYREF: string;     //  應付憑單號碼/CASH_DEPOSIT_DETAIL.KEY_NO
  public IN_USER: string;     //
  public IN_DATE: Date;     //
  public UP_USER: string;     //
  public UP_DATE: Date;     //
  public TR_ACT_KEY: number;     //  新迴轉傳票之KEY_NO(FIN_ACT_MAIN.KEY_NO)
  public VOU_KEY: number;     //  Keep FIN_VOU_MAIN.KEY_NO for reference
  public SRC_TAB: string;     //
  public SRC_KEY: number;     //
  public CP_ACT_KEY: number;     //  原現支傳票之KEY_NO(FIN_ACT_MAIN.KEY_NO)
  public OPER_TYPE: string;     //  財務部判斷營運類別做何用途 ,for reference
  public OPER_DATE: Date;     //  財務部判斷營運日期做何用途 ,for reference
  public BANK_CODE: string;     //  財務部判斷 bank_code做何用途 ,for reference
  public NVOYAGE: string;     //  New Voyage Code
  public NVESSEL: string;     //  New Vessel Code
  public SUB_CODE: string;     //  Sub A/C Code 1
  public SUB_CODE2: string;     //  Sub A/C Code 2
  public SGA_PERIOD: string;     //  台灣區分公司申請 SGA
  public LFC_WEEK: string;     //
  public DTL_FLEX1: string;     //
  public DTL_FLEX2: string;     //
  public DTL_FLEX3: string;     //
  public DTL_FLEX4: string;     //
  public DTL_FLEX5: string;     //
  public DTL_FLEX6: string;     //
  public DTL_FLEX7: string;     //
  public DTL_FLEX8: string;     //
  public DTL_FLEX9: string;     //
  public DTL_FLEX10: string;     //
  public DTL_FLEX11: string;     //
  public DTL_FLEX12: string;     //
  public DTL_FLEX13: string;     //
  public DTL_FLEX14: string;     //
  public DTL_FLEX15: string;     //
}
