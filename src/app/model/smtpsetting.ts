import { SmtpAuthMethod, SmtpProtocol } from "../constants/fieldtypes.constants";
export interface SmtpSetting {
  id: string;
  server: string;
  username: string;
  from?: string;
  password: string;
  port: number;
  testemail?: string;
  authMethod: SmtpAuthMethod;
  protocol:   SmtpProtocol;
  registrationDate: Date;
}
