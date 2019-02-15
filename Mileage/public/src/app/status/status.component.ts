import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService, UserDetails } from '../auth.service'
@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  stats = {};
  errors: any;
  details: any;
  userId: any;
  miles: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private auth: AuthService,

  ) {};

  ngOnInit() {
    this.auth.miles().subscribe(
      user1 => {
        console.log("working in Status")
        this.details = user1
        this.userId = this.details._id
        this.miles = user1
        console.log(this.details, "Status this.details")
        console.log(this.details.user[0]._id , " user id in status")
      },
      err => {
        console.log("error in create")
        console.error(err)
      }
    )
  };

  onCreate(){

     let observable = this._httpService.addStats(this.stats, this.details.user[0]._id);
    observable.subscribe(data => {
      console.log("Added Stats", data);
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
        this._router.navigateByUrl('/miles');
      }
    });
    this._router.navigateByUrl('/miles');

  }

}