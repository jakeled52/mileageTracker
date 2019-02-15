import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  miles = {distance: 0,
  distance1:0,
  distance2:0};
  Uid: number;
  errors: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {};

  ngOnInit() {
    this.getOne();
  }
  getOne(){
    this._route.params.subscribe((params: Params) => {
      console.log(params['id'], 'paramsId in getOne',params['Uid'], "user Id in getOne")
      let observable = this._httpService.getOne(params['id'],params['Uid']);
      observable.subscribe(data => {
        console.log(data, " data in get one")
        this.miles = data['miles'];
        console.log(this.miles);
        this.Uid = params['Uid'];
      });
    });
  };
  onEdit(){
    console.log(this.miles)
    this.miles.distance = this.miles.distance2 - this.miles.distance1;
    var observable = this._httpService.editMiles(this.miles["_id"], this.Uid, this.miles);
      observable.subscribe(data => {
        console.log(data);
        if(data['err']){
          
          if(data['err']['errors']){
            this.errors = [];
            var error = data['err']['errors'];
            console.log(error, "got these errors");
            for(let err in error){
              this.errors.push(error[err]);
            };
            console.log(this.errors, "These are the errors")
          };
        }
        
          // this.errors = null;
      });
      window.location.reload();
      this._router.navigateByUrl('/miles');
  };


}