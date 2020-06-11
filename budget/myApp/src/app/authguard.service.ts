import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthserviceService } from './authservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {

  constructor(private router :Router,private authservice: AuthserviceService) { }
 canActivate():boolean{

  if(this.authservice.loggedIn())
  {
    console.log("hiyaah");
    return true
  }
  else
  {
    console.log("lol")
    this.router.navigate(['/login'])
    return false;
  }
 }

}
