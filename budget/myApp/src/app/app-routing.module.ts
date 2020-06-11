import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ItemComponent } from './item/item.component';
import { AuthguardService } from './authguard.service';
import { InsertItemComponent } from './insert-item/insert-item.component';
import { GetitemComponent } from './getitem/getitem.component';


const routes: Routes = [
  {
    path:'',
    redirectTo :'/item',
    pathMatch : 'full'
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path : 'register',
    component : RegisterComponent
  },
  {
    path  :'item',
    component: ItemComponent,
    canActivate : [AuthguardService]
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
