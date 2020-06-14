import { Component, OnInit } from '@angular/core';
import {NgbModal,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap'
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  closeResult = '';
  nameOfprofile : string
  name=localStorage.getItem('user')
  budget : number
  bud : string
  tot : any
  profilename=[]
  constructor(private modalService: NgbModal,
    private auth: AuthserviceService,private router : Router) {}

  ngOnInit() : void{
  //  console.log(this.name)
  this.bud= localStorage.getItem(this.name)
  this.tot=this.bud.split(" ");
  this.budget=parseInt(this.tot[0],10)
  
this.auth.getprofiles(this.name).subscribe(res=>{
 // console.log(res.length);
  this.profilename=JSON.parse(JSON.stringify(res));
});
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `${result}`+" "+this.nameOfprofile;
      const data={
        name : this.name,
        profile : this.nameOfprofile
      }
       this.auth.addprofile(data).subscribe(res=>{
        
         this.auth.getprofiles(this.name).subscribe(res=>{
          this.profilename=JSON.parse(JSON.stringify(res));
          this.nameOfprofile=''
        });
       },
       err=>{
         console.log(err+" jn");
       })
    });
  }
  delete(i)
  {
    const data={
      name : this.name,
      profilename : i
    }
    this.auth.deleteprofile(data).subscribe(res=>{
      console.log(res);
      this.auth.getprofiles(this.name).subscribe(res=>{
        this.profilename=JSON.parse(JSON.stringify(res));
        this.nameOfprofile=''
      });
    },
    err=>{
      console.log(err);
    })
  }

   
}
