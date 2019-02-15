import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router, NavigationEnd} from '@angular/router';
import { AppRoutingModule } from "./app-routing.module"

export interface UserDetails{
  _id:string
  username:string
  password:string
  milesArray: [];
  category: any;
  user: any;
  type: any;
  exp: number
  iat: number
}
interface TokenResponse{
  token: string
}

export interface TokenPayload{
  _id:string
  username:string
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string
  constructor(private http: HttpClient, private router: Router) { }
  private saveToken(token: string):void{
    localStorage.setItem('usertoken',token)
    this.token = token
  }
  private getToken():string{
    if(!this.token){
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): UserDetails{
    const token = this.getToken()
    var payload
    if(token){
      payload = token.split('.')[1]
      payload = window.atob(payload)
      return JSON.parse(payload)
    }else{
      return null
    }
  }
  public isLoggedIn(): boolean{
    const user = this.getUserDetails()
    if(user){
      return user.exp > Date.now()/1000
    }else{
      return false;
    }
  }
  public register(user: TokenPayload): Observable<any>{
    const base = this.http.post('/register', user)
    const request = base.pipe(
      map((data: TokenResponse) =>{
        if(data.token){
          this.saveToken(data.token)
        }
        return data
      })
    )
    return request
  }
  public login(user: TokenPayload): Observable<any>{
    const base = this.http.post('/login',user)
    const request = base.pipe(
      map((data: TokenResponse)=>{
        if(data.token){
          this.saveToken(data.token)
        } return data
      })
    )
    return request
  }
  public miles(): Observable<any>{
    return this.http.get('/api/miles',{
      headers: { Authorization: `${this.getToken()}`}
    })
  }
  public postMiles(): Observable<any>{
    console.log("postMiles")
    return this.http.get('/api/miles/new',{
      headers : { Authorization: `${this.getToken()}`}
    })
  }
  public profile(): Observable<any>{
    return this.http.get('/profile',{
      headers: { Authorization: `${this.getToken()}`}
    })
  }

  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
