import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name : string
  password : String

  constructor(private auth:AuthserviceService,private router : Router) { }

  ngOnInit(): void {
  }
registerUser(){
  const registerUserData ={
   name:this.name,
   password : this.password
  }
  this.auth.registerUser(registerUserData).subscribe(
    res=>{
       console.log(res)
       localStorage.setItem('token',res.token)
       this.router.navigate(['/profiles']);
       localStorage.setItem('user',this.name)
    },
    err=>{
      console.log("errr in save");
    }
  )
}

}
