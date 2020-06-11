import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from '../authservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  name : String
  password : String

  constructor(private auth:AuthserviceService,private router : Router) { }

  ngOnInit(): void {
  }
loginUser(){
  const loginUserData ={
   name:this.name,
   password : this.password
  }
  this.auth.loginUser(loginUserData).subscribe(
    res=>{
       console.log(res)
       localStorage.setItem('token',res.token)
       this.router.navigate(['/item']);
    },
    err=>{
      console.log(err);
    }
  )
}
}
