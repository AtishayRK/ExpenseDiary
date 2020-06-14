import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Router} from '@angular/router'
@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  private registerUri ="http://localhost:4000/apis/register";
  private loginUri="http://localhost:4000/apis/login";
  private itemUri ="http://localhost:4000/apis/item"
  private insertItemUri="http://localhost:4000/apis/insert"
  private getitemUri="http://localhost:4000/apis/getitem"
  constructor(private http : HttpClient,
    private router : Router) { }

    registerUser(user)
    {
      
      return this.http.post<any>(this.registerUri,user);
    }
  
  loginUser(user)
    {
      return this.http.post<any>(this.loginUri,user);
    }
    loggedIn()
    {
      return !!localStorage.getItem('token');
    }
    gettoken()
    {
      return localStorage.getItem('token');
    }
    loggedOut()
    {
localStorage.removeItem('token');
localStorage.removeItem('user');
this.router.navigate(['/login']);
    }
    saveItem(itemdata)
    {
      return this.http.post<any>(this.itemUri,itemdata);
    }
    insertItem(itemdata)
    {
      return this.http.post<any>(this.insertItemUri,itemdata);
    }
    getItem(data)
    {
     var obj=JSON.stringify(data);
        
      return this.http.get<any>("http://localhost:4000/apis/getitem"+"?myobj="+encodeURIComponent(obj));
    }
    addprofile(data){
     
    //  console.log(data)
      return this.http.post<any>("http://localhost:4000/apis/profiles",data);
    }
    getprofiles(name)
    {
    //  console.log(name)
      return this.http.get<any>("http://localhost:4000/apis/getprofiles/"+name);
    }
    deleteprofile(data)
    {
      var profile=JSON.stringify(data)
      return this.http.delete<any>("http://localhost:4000/apis/deleteProfile"+"?profile="+encodeURIComponent(profile));
    }
    getbudget(name)
    {
      return this.http.get<any>("http://localhost:4000/apis/getbudget/"+name);
    }
    setbudget(data)
    {
      return this.http.post<any>("http://localhost:4000/apis/setbudget",data);
    }
}
