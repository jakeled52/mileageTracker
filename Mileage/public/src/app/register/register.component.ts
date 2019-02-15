import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../auth.service'
import { Router } from '@angular/router'
import { registerContentQuery } from '@angular/core/src/render3';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  credentials: TokenPayload = {
    _id: '',
    username: '',
    password: ''
  }
  constructor(private auth: AuthService, private router: Router) { }


  register(){
    console.log('register');
    this.auth.register(this.credentials).subscribe(
      
      ()=> {
        console.log('reg profile')
        this.router.navigateByUrl('/')
      },
      err => {
        console.log('err')
        console.log(err)
      }
    )
  }
}
