import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{FormsModule,ReactiveFormsModule} from "@angular/forms"
import { AppRoutingModule } from './app-routing.module';
import {CustomFormsModule,CustomValidators} from 'ng2-validation'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { InsertItemComponent } from './insert-item/insert-item.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthserviceService } from './authservice.service';
import { AuthguardService } from './authguard.service';
import { TokeninterceptorService } from './tokeninterceptor.service';
import { GetitemComponent } from './getitem/getitem.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfilesComponent } from './profiles/profiles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    InsertItemComponent,
    GetitemComponent,
    ProfilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    CustomFormsModule,
    NgbModule,
    BrowserAnimationsModule

  ],
  providers: [AuthserviceService,AuthguardService,
  {
    provide : HTTP_INTERCEPTORS,
    useClass : TokeninterceptorService,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
