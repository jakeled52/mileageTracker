import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
const routes: Routes = [
  { path: 'miles', component: MilesComponent, canActivate:[AuthguardService]},
  { path: 'miles/new', component: CreateComponent},
  { path: 'miles/stats', component: StatusComponent},
  { path: 'miles/edit/:id/:Uid', component: EditComponent},
  { path: 'miles/:id/:Uid', component: DetailsComponent},
  {path: 'miles/delete/:id', redirectTo: 'miles', pathMatch: 'full'},
  {path: '', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthguardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
