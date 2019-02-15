import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  miles = {};
  errors: any;
  id: number;
  Uid: number;
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
      this.id = params.id;
      this.Uid = params.Uid;
      console.log(params['id'])
      let observable = this._httpService.getOne(params['id'],params['Uid']);
      observable.subscribe(data => {
        this.miles = data['miles'];
      });
    });
  };
  onDelete(){
    let observable = this._httpService.deleteMiles(this.id,this.Uid);
      observable.subscribe(data => {
        console.log("Deleted this miles", data);
      });
    };

}