import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
budget : number
name= localStorage.getItem('user')
warn : number
  constructor(private authservice : AuthserviceService) { }

  ngOnInit(): void {
  }
   setbudget(){
     const data={
       name:name,
       budget:this.budget,
       warn : this.warn
     }
     this.authservice.setbudget(data).subscribe(
       res=>{
         console.log("budget set");
         localStorage.setItem(this.name,this.budget.toString()+" "+this.warn.toString());
        
        //  console.log(localStorage.getItem(name))
         this.budget=null
         this.warn=null;
       },
       err=>{
         console.log("err");
       }
     )
   }
}
