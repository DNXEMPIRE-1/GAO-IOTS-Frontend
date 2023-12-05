
export class License {

  public serialnumber: string;
  public systemID: string;
  public licenseInfo: string;
  public timestamp: string;
  public company: string;
  public status : boolean;



  constructor(serialNumber?: string, systemID?: string, licenseInfo?: string, timestamp?: string, campany?: string,  status?: boolean){
        this.serialnumber = serialNumber || '';
        this.systemID = systemID || '';
        this.licenseInfo = licenseInfo || '';
        this.timestamp  = timestamp || '';
        this.company = campany || '';
        this.status = status || true;
  }

}
