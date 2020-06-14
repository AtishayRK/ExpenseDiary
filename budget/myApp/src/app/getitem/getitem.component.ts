import { Component, OnInit } from '@angular/core';
import {NgbDateStruct,NgbDate,NgbCalendar} from "@ng-bootstrap/ng-bootstrap"
import { AuthserviceService } from '../authservice.service';
@Component({
  selector: 'app-getitem',
  templateUrl: './getitem.component.html',
  styleUrls: ['./getitem.component.css']
})
export class GetitemComponent implements OnInit {

   modelfrom : NgbDate
   modelto :NgbDate
   name=localStorage.getItem('user')
   selected : string
   profilename =[]
  constructor(private calendar : NgbCalendar,
    private auth:AuthserviceService) { }

  list=[]
  sorteddata=[]
  show : Boolean =false;
  total : number=0
  ngOnInit(): void {
    this.slectToday()
    this.list=[]
    this.sorteddata=[]
    this.show=false;
    this.selected=""
    this.auth.getprofiles(this.name).subscribe(res=>{
      // console.log(res.length);
       this.profilename=JSON.parse(JSON.stringify(res));
     });

  }
 slectToday(){
   this.modelfrom=this.calendar.getToday();
   this.modelto=this.calendar.getNext(this.modelfrom);
   
 }
 getdata()
 {
   this.list=[]
   this.sorteddata=[]

  this.modelto=this.calendar.getNext(this.modelto)
    const data={
      name : this.name,
      profile : this.selected,
    day1:this.modelfrom.day,
    month1:this.modelfrom.month,
    year1:this.modelfrom.year,
    day2:this.modelto.day,
    month2:this.modelto.month,
    year2:this.modelto.year
   }
   
   if(data.year1>data.year2||data.day1===undefined||data.day2===undefined||data.month1===undefined||data.month2===undefined||data.year1===undefined||data.year2===undefined||this.selected==='')
   alert("setProperdate")
   else if((data.year1===data.year2)&&(data.month1>data.month2))
   alert("setproperdate")
   else if(data.year1===data.year2&&data.month1===data.month2&&data.day1>data.day2)
   alert("setproperdate")
  this.auth.getItem(data).subscribe(
    res=>{
       this.total=0;
      if(res.length===0)
      this.show=false;
       else
       this.show=true
      for(var i=0;i<(JSON.parse(JSON.stringify(res))).length;i++)
      {
        var data=JSON.parse(JSON.stringify(res))[i].date;
         var ans=data.slice(0,10)   
        
        this.list[i]={
          
          item:(JSON.parse(JSON.stringify(res)))[i].item,
          amt:JSON.parse(JSON.stringify(res))[i].amt,
          date :ans
        }
       this.total=this.total+this.list[i].amt
        
      }
      console.log(this.total)
      this.sorteddata=this.list.sort((a,b)=>{
        var dateA = new Date(a.date), dateB = new Date(b.date);
       
        return dateA.getTime() - dateB.getTime();
    });

    }
    ,
    err=>{
      console.log(err);
    }
   

  )
 
  this.show=true;
 }
}
