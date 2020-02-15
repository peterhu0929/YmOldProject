import { FIN_VOUCHER } from './../../_model/FIN_VOUCHER';
export class V_FIN_VOUCHER extends FIN_VOUCHER {
  public VDATE_FROM: Date; //  傳票日期起點(出納)
  public VDATE_TO: Date; //  傳票日期終點(出納)
  public EDI_SW: Boolean = false;
  public ORAMT: number;
  public ORCURR: string;
  public VOU_LR: string;
  public G_VOUCHER: string;
  public prostatusName: string;
  public cMakerName: string;
  public vMakerName: string;
  public vTypeName: string;
}
