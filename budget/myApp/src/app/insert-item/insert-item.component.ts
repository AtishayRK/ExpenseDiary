import { Component, OnInit } from '@angular/core';
import{} from '@angular/compiler'
import { ArgumentType } from '@angular/compiler/src/core';
import { AuthserviceService } from '../authservice.service';
import {NgbDateStruct,NgbDate,NgbCalendar} from "@ng-bootstrap/ng-bootstrap"
import {MatSelect} from '@angular/material/select'
@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})
export class InsertItemComponent implements OnInit {
 item : String
 amt : number
 model : NgbDate
 name=localStorage.getItem('user')
 tot : any
 bud: string
 budget:number
 warn : number
 show : Boolean=false;
 show2 : Boolean= false;
 profilename=[]
 selected : string
  constructor(private auth : AuthserviceService,
    private calendar:NgbCalendar) { }

  ngOnInit(): void {
    this.selectToday()
    this.selected=""
   this.bud= localStorage.getItem(this.name)
    this.tot=this.bud.split(" ");
    this.budget=parseInt(this.tot[0],10)
    this.warn=parseInt(this.tot[1],10)
    if(this.budget<this.warn)
    this.show=true;
    else
    this.show=false;
    if(this.budget===0)
   { 
     this.show=false;
      this.show2=true;
    } else
     this.show2=false;
    this.auth.getprofiles(this.name).subscribe(res=>{
      // console.log(res.length);
       this.profilename=JSON.parse(JSON.stringify(res));
     });
  }
  selectToday()
  {
    this.model=this.calendar.getToday()
  }
  saveItem(){
    const itemdata={
      item : this.item,
      amt:this.amt,
      day: this.model.day,
      month:this.model.month,
      year:this.model.year,
      profile : this.selected,
      name : this.name
    }
    console.log(this.selected);
    if(this.amt===0||this.item===undefined)
    {
        alert("any input is zero");
    }
    else{
    this.auth.insertItem(itemdata).subscribe(
      res=>{
        console.log(res);
        this.budget=this.budget-this.amt;
        if(this.budget<this.warn)
        this.show=true;
        if(this.budget<0)
       {
          this.budget=0;
          this.show2=true;
          this.show=false;
       }
       const data={
          name: this.name,
          budget:this.budget,
          warn : this.warn
        }
        this.auth.setbudget(data).subscribe(
          res=>{
            console.log(res);
            localStorage.setItem(this.name,this.budget.toString()+" "+this.warn.toString());
          },
          err=>{
            console.log(err);
          }
        )
        this.item=null;
        this.amt=null;
      this.model=this.calendar.getToday();
      
      },
      err=>{
       console.log("err in insert");
      }
    )
    }
  }
}
