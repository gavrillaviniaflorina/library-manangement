export  class Book{
    public id:number=0;
    public title:string="";
    public author:string="";
    public gen:string="";
    public year: number=0;
    
  
  
    constructor(id:number=0,title: string, author: string, gen: string, year: number) {
      this.title = title;
      this.author = author;
      this.gen = gen;
      this.year = year;
      this.id=id;
    }
  }
  