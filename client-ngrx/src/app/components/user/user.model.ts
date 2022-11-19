export class User{
    public id:number=0;
    public email:string="";
    public token:string="";


    constructor( id:number, email:string, token:string){
        this.id=id;
        this.email=email;
        this.token=token;
    }
}


