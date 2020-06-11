import { Component, OnInit } from '@angular/core';
import { ArgumentType } from '@angular/compiler/src/core';
import { AuthserviceService } from '../authservice.service';
import {NgbDateStruct,NgbDate,NgbCalendar} from "@ng-bootstrap/ng-bootstrap"
@Component({
  selector: 'app-insert-item',
  templateUrl: './insert-item.component.html',
  styleUrls: ['./insert-item.component.css']
})
export class InsertItemComponent implements OnInit {
 item : String
 amt : Number
 model : NgbDate
  constructor(private auth : AuthserviceService,
    private calendar:NgbCalendar) { }

  ngOnInit(): void {
    this.selectToday()
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
      year:this.model.year
    }
    if(this.amt===0||this.item===undefined)
    {
        alert("any input is zero");
    }
    else{
    this.auth.insertItem(itemdata).subscribe(
      res=>{
        console.log(res);
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
