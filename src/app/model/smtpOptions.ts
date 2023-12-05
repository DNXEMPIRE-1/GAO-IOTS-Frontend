import { SmtpAuthMethod, SmtpProtocol } from "../constants/fieldtypes.constants";

export class SmtpOptions
{
  smtpAuthMethodList: SmtpAuthMethodOption[];
  smtpProtocolList: SmtpProtocolOption[];

  constructor()
  {
    this.smtpAuthMethodList = new Array<SmtpAuthMethodOption>;
    this.smtpProtocolList = new Array<SmtpProtocolOption>;
    let opt: SmtpAuthMethodOption = {name: 'NONE', value: SmtpAuthMethod.NONE};
    this.smtpAuthMethodList.push(opt);
    opt = {name: 'PASSWORD', value: SmtpAuthMethod.PASSWORD};
    this.smtpAuthMethodList.push(opt);
    opt = {name: 'ENCRYPTED_PASSWORD', value: SmtpAuthMethod.ENCRYPTED_PASSWORD};
    this.smtpAuthMethodList.push(opt);
    opt = {name: 'KERBEROS', value: SmtpAuthMethod.KERBEROS};
    this.smtpAuthMethodList.push(opt);
    opt = {name: 'NTLM', value: SmtpAuthMethod.NTLM};
    this.smtpAuthMethodList.push(opt);

    let prt: SmtpProtocolOption = {name: 'NONE', value: SmtpProtocol.NONE};
    this.smtpProtocolList.push(prt);
    prt = {name: 'STARTTLS', value: SmtpProtocol.STARTTLS};
    this.smtpProtocolList.push(prt);
    prt = {name: 'SSL', value: SmtpProtocol.SSL};
    this.smtpProtocolList.push(prt);
  }
  getAuthMethodList() : SmtpAuthMethodOption[]
  {
    return this.smtpAuthMethodList;
  }
  getProtocolList() : SmtpProtocolOption[]
  {
    return this.smtpProtocolList;
  }
}

export interface SmtpAuthMethodOption
{
  name: string;
  value: SmtpAuthMethod;
}
export interface SmtpProtocolOption
{
  name: string;
  value: SmtpProtocol;
}
