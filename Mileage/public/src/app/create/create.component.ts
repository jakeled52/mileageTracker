import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService, UserDetails } from '../auth.service'
import { FormsModule } from  '@angular/forms';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  miles = {distance1: 0,
  distance2: 0 ,
  distance: 0,
  user: []
  };
  sameSame:[string];
  errors: any;
  details: UserDetails;
  userId: any
  catIsGood: boolean;
  cat: boolean;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private auth: AuthService,
    private forms: FormsModule,
  ) {};

  ngOnInit() {
    console.log("ngOnInit")
    this.auth.miles().subscribe(
      user1 => {
        console.log("working in Create")
        this.details = user1
        this.userId = this.details._id
        this.miles = user1
        this.catIsGood = true;
        if(this.cat){
          this.catIsGood = false;
        }
        this.miles.distance1 = this.miles.user[0].milesArray[this.miles.user[0].milesArray.length-1].distance2;
        this.miles.distance2 = this.miles.user[0].milesArray[this.miles.user[0].milesArray.length-1].distance2+1;
      },
      err => {
        console.log("error in create")
        console.error(err)
      }
    )
  };

  onCreate(){
    this.miles.distance = this.miles.distance2 - this.miles.distance1;
    console.log(this.miles, 'this.miles in on create')
    console.log(this.userId, ' user Id in create.component.ts')
    console.log(this.details, "this.details onCreate in create.component.ts")
    this.catIsGood = true;
    var catType = this.details.type;
    var catCat = this.details.category;
    for(var i = 0; i < this.details.user[0].milesArray.length; i++){
      if(this.details.user[0].milesArray[i].category == catCat && this.details.user[0].milesArray[i].type != catType && this.details.user[0].milesArray[i].category != ""){
        this.catIsGood = false;
      }
    }
    console.log(catType)
    // if(!this.catIsGood){
    //   this.cat = true;
    //   this.sameSame.push("Category exists on type " , this.details.category,".")
    // }
    console.log(this.catIsGood, ' cat is good');
    if(this.catIsGood){
    let observable = this._httpService.addMiles(this.miles);
    observable.subscribe(data => {
      console.log("Added an miles", data);
      if(data['err']){
        if(data['err']['errors']){
          this.errors = [];
          let error = data['err']['errors'];
          console.log("errors:", error);
          for(let err in error){
            this.errors.push(error[err]);
          };
          console.log(this.errors, "-- errors --")
        };
      }      
      else{
        // this.errors = null;
        console.log("no errors")
        this._router.navigateByUrl('/miles');
      }
    });
  }
  else{
    this.errors.push("Cant do that")
  }
  }
}