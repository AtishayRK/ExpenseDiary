import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { format } from 'path';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {CustomValidators} from 'ng2-validation'
@Component({
  selector: 'app-item',
  templateUrl:'./item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  item  : String
  amt : Number
  myGroup : any
  check : boolean=false;
  constructor(private auth : AuthserviceService) {
    this.myGroup=new FormGroup({
      item: new FormControl("",Validators.required),
      amt : new FormControl("",CustomValidators.min(1))
    })
   }

  ngOnInit(): void {
  }
  
saveItem(){
    const itemdata={
      item : this.item,
      amt: this.amt
    }
 
if(this.item===undefined||this.amt<=0)
{
this.check=true;

}
else
{
  this.check=false;
console.log(itemdata.item);
    
    this.auth.saveItem(itemdata).subscribe(
      res=>{
        console.log(res);
      this.item=null;
      this.amt=null;
        //("data saved success");
      },
      err=>
      {
        console.log("errr in save");
      }

    )
    
  }
}
}
