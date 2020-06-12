import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthguardService } from './authguard.service';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { GetitemComponent } from './getitem/getitem.component';
import { ProfilesComponent } from './profiles/profiles.component';


const routes: Routes = [
  {
    path:'',
    redirectTo :'/profiles',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'profiles',
    component : ProfilesComponent,
    canActivate : [AuthguardService]
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path : 'insert-item',
    component :InsertItemComponent,
    canActivate :[AuthguardService]
  },{
    path :'getitem',
    component: GetitemComponent,
    canActivate :[AuthguardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
