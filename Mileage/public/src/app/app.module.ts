import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MilesComponent } from './miles/miles.component';
import { EditComponent } from './edit/edit.component';
import { CreateComponent } from './create/create.component';

import {RouterModule, Routes} from '@angular/router'
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { StatusComponent } from './status/status.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import {AuthService} from './auth.service'
import {AuthguardService} from './authguard.service'
import { DatePipe } from '@angular/common'
@NgModule({
  declarations: [
    AppComponent,
    MilesComponent,
    EditComponent,
    CreateComponent,
    DetailsComponent,
    StatusComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [HttpService, AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }