export class AR_LFC_CONFIRM_ACCT {
  KEY_NO: Number; //           NUMBER,
  AGENT_CODE: string; //       VARCHAR2(5 BYTE),
  ACCT9: string; //            VARCHAR2(10 BYTE),
  PROCESS_UID: string; //      VARCHAR2(20 BYTE),
  IN_DATE: Date; //          DATE,
  OS_USER: string; //          VARCHAR2(200 BYTE),
  TERMINAL: string; //         VARCHAR2(200 BYTE),
  COMPANY_ID: string; //       VARCHAR2(5 BYTE),
  AGN_EMAIL: string; //        VARCHAR2(200 BYTE),
  AGN_FLAG: string; //         VARCHAR2(1 BYTE),
  LFC_FLAG: string; //         VARCHAR2(1 BYTE)             DEFAULT 'N',
  KPI_RATIO: Number; //        NUMBER,
  AREA: string; //             VARCHAR2(5 BYTE),
  EFFECT_DATE: Date; //      DATE,
  EXPIRE_DATE: Date; //      DATE,
  SGA_CODE: string; //         VARCHAR2(5 BYTE),
  BANK_GRT_AMT: string; //     VARCHAR2(200 BYTE),
  BANK_GRT_DATE_B: Date; //  DATE,
  BANK_GRT_DATE_E: Date; //  DATE,
  OS_MONTH: Number; //         NUMBER,
  CASH_MONTH: Number; //       NUMBER,
  AGN_NAME_E: string; //       VARCHAR2(30 BYTE),
  AGN_TYPE: string; //         VARCHAR2(3 BYTE),
  REMARKS: string; //          VARCHAR2(4000 BYTE)
  AgentName: string;
  ProcessUserName: string;
  AgnTypeName: string;
}
