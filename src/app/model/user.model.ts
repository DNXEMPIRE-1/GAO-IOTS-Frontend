
export class User{

  public id: string;
  public name: string;
  public firstname: string;
  public lastname: string;
  public email : string;
  public password: string;
  public authorities? : string[];
  public addTime: Date;
  public statusMsg : string;
  public authStatus : string;
  public newPassword?: string;


  constructor(id?: string,name?: string, firstname?: string, lastname?: string, email?: string,  password?: string,role?: string,
      addTime?:Date,statusMsg?:string, authStatus?:string, authorities? : string[]){
        this.id = id || '';
        this.name = name || '';
        this.firstname = firstname || '';
        this.lastname  = lastname|| '';
        this.email = email || '';
        this.password = password || '';
        this.authorities = authorities;
        this.addTime = addTime || new Date();
        this.statusMsg = statusMsg || '';
        this.authStatus = authStatus || '';
  }

}
