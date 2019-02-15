import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService , UserDetails} from "../auth.service"
@Component({
  selector: 'app-miles',
  templateUrl: './miles.component.html',
  styleUrls: ['./miles.component.css']
})
export class MilesComponent implements OnInit {
  miles = [];
  stats = [];
  details: UserDetails;
  totalMiles: number;
  price: number;
  bMiles: number;
  mdMiles: number;
  mvMiles: number;
  pMiles: number;
  bD: number;
  mdD: number;
  mvD: number;
  deduction: number;
  Uid: number;
  cat: any;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router,
    private auth: AuthService
  ) {};

  ngOnInit() {
   // this.allMiles();
   console.log("ngOnInit miles.component.ts")
    this.auth.miles().subscribe(
      user => {
      
        console.log("working")
        this.details = user
        this.miles = user.user[0].milesArray
        this.sortByDate();
        this.Uid = user.user[0]._id
        console.log(this.miles, "this.miles")
        console.log(this.details, " this.details ")
        this.getMiles();
        this.getStats();
      },
      err => {
        console.log
        console.error(err)
      }
    )

  };
  postMiles(){
    this.auth.postMiles();
  }
  allMiles(){
    let observable = this._httpService.getMiles();
    observable.subscribe(data => {
      console.log(data, "got miles miles")
      this.miles = data['milesArray']['miles']
      console.log(this.miles,"this . miles")
      this.getMiles();
      this.getStats();
    });
  };
  getStats(){
    let observable = this._httpService.getStats(this.Uid);
    observable.subscribe(data => {
      console.log(data, "got stats stats");
      this.stats = data['stats'];
      console.log(this.stats, " this . stats");
      if(this.stats.length > 0){
        this.price = ((this.totalMiles/this.stats[this.stats.length-1].mpg)*this.stats[this.stats.length-1].ppg);
        this.price = Math.ceil(this.price * 100)/100;  
      }
    });

  }
  logout(){
    this.auth.logout();
  }
  onDelete(id,Uid){
      let observable = this._httpService.deleteMiles(id,Uid);
        observable.subscribe(data => {
          console.log(Uid, " User id in onDelete miles.component.ts")
          console.log("Deleted this miles", data);
        });
        this.auth.miles().subscribe(
          user => {
            console.log("working")
            this.details = user
            this.miles = user.user[0].milesArray
            this.miles.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
              
            this.Uid = user.user[0]._id
            console.log(this.miles, "this.miles")
            console.log(this.details, " this.details ")
            this.getMiles();
            this.getStats();
          },
          err => {
            console.log
            console.error(err)
          }
        )
  };
  public sortByDate(): void{
    this.miles.sort((a,b) =>{
      console.log(a.date, b.date, " ABCDEFGHIJKLMNOPQRSTUVWXYZ");
      a.date = new Date(a.date)
      b.date = new Date(b.date)
      return b.date.getTime() - a.date.getTime(); 
    })
  }
  getMiles(){
    this.totalMiles = 0;
    this.deduction = 0;
    this.bMiles = 0;
    this.bD = 0;
    this.mdD = 0;
    this.mvD = 0;
    this.mdMiles = 0;
    this.mvMiles = 0;
    this.pMiles = 0;
    for(var mile of this.miles){
      this.totalMiles += mile.distance;
      if(mile.type == 'Business')
        this.bMiles += mile.distance;
      if(mile.type == 'Medical')
        this.mdMiles += mile.distance;
      if(mile.type == 'Moving')
        this.mvMiles += mile.distance;
      if(mile.type == "Personal")
        this.pMiles += mile.distance;
    }
    this.bD = this.bMiles * .54;
    console.log(this.bD," this.bD")
    this.mdD = this.mdMiles * .18;
    this.mvD = this.mvMiles * .18;
    this.deduction = this.bD + this.mdD + this.mvD;
    this.deduction = Math.ceil(this.deduction * 100)/100;
    this.bD = Math.ceil(this.bD*100)/100;
    this.mdD = Math.ceil(this.mdD*100)/100;
    this.mvD = Math.ceil(this.mvD*100)/100;
  }
  searchByCat(){
    console.log(this.cat, " searchByCat")
    this.miles = [];
    for(var i = 0; i < this.details.user[0].milesArray.length; i++){
      if(this.details.user[0].milesArray[i].category == this.cat){
        this.miles.push(this.details.user[0].milesArray[i]);
      }
    }
    this.getMiles();
    this.getStats();
  }
  reset(){
    this.miles = [];
    for(var i = 0; i < this.details.user[0].milesArray.length; i++){
       this.miles.push(this.details.user[0].milesArray[i]);
    }
    this.getMiles();
    this.getStats();
  }
}