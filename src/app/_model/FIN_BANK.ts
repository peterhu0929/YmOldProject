export class FIN_BANK {
  public COMPANY_ID: string; //  公司類別 COMPANY.COMPANY_ID
  public BANK_CODE: string; //  出納人員使用銀行代碼
  public BANK_DESC: string; //  銀行名稱
  public BANK_TYPE: string; //  銀行類別
  public CURR_CD: string; //  幣別
  public ACCTNUM: string; //  帳號
  public IN_USER: string; //
  public IN_DATE: Date; //
  public UP_USER: string; //
  public UP_DATE: Date; //
  public REMARK: string; //
  public EFF_DATE: Date; //
  public EXP_DATE: Date; //
  public BANK_ACCOUNT: string; //  銀行帳號
  public BANK_SWIFT_CODE: string; //  各銀行分行代號
  //
  //
  public CUST_CODE: string; //
  public COUNTRY: string; //
  public CITI_EDI: string; //  是否接收花旗EDI檔案,是->'Y',否->'N'
  public FLEX_1: string; //  報收傳票是否為申請中 , N=新增,Y=申請中
  public FLEX_2: string; //  是否接收花旗 EDI940
  public FLEX_3: string; //  是否接收花旗 EDI942
  public FLEX_4: string; //  該幣別預設付款銀行(Y/N)?
  public FLEX_5: string; //
  public FLEX_6: string; //
}
