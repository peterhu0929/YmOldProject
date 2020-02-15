export class CASH_SETTLEMENT_MASTER {
    public KEY_NO: number;     //
    public COMPANY_ID: string;     //  公司別
    public SEQREF: string;     //  交易序號
    public TRADE_DATE: Date;     //  交易日期

    public SETTLEMENT_DATE: Date;     //  交割日期

    public T1_SELL_CURRENCY: string;     //
    public T1_SELL_AMT: number;     //
    public T1_BUY_CURRENCY: string;     //
    public T1_BUY_AMT: number;     //
    public T1_SELL_EXCHANGE_RATE: number;     //
    public T2_BUY_CURRENCY: string;     //
    public T2_BUY_AMT: number;     //
    public T2_SELL_CURRENCY: string;     //
    public T2_SELL_AMT: number;     //
    public T2_BUY_EXCHANGE_RATE: number;     //
    public SUMMARY: string;     //  說明總結
    public OP_BANK: string;     //  承作銀行
    public SETTLEMRNT_T1_CURRENCY: string;
    public SETTLEMENT_T1_AMT: number;
    public SETTLEMENT_T2_CURRENCY: string;
    public SETTLEMENT_T2_AMT: number;
    public SETTLEMENT_CURRENCY: string;     //  交割幣別
    public SETTLEMENT_AMT: number;     //  交割收入
    public DP_BANK: string;     //  存入銀行
    public TRADE_USER: string;     //  承作人員
    public SETTLEMENT_USER: string;     //  交割人員
    public STATUS: string;     //
    public FLEX_1: string;     //
    public FLEX_2: number;     //
    public FLEX_3: string;     //
    public FLEX_4: number;     //
    public FLEX_5: string;     //
    public IN_USER: string;     //  insert user
    public IN_DATE: Date;     //  insert date
    public UP_USER: string;     //  update user
    public UP_DATE: Date;     //  update date
    public TRADE_DATE_S: Date;     //  交易日期起始日
    public TRADE_DATE_E: Date;     //  交易日期結束日
    public isDisabled = false;
    public EDI_SW = false;
    public vTRADE_DATE: string;
    public vSETTLEMENT_DATE: string;
}
