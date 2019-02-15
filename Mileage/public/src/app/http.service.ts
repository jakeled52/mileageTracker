import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient){};

  addMiles(miles){
    //console.log(userId, " user id in http.service.ts")
    console.log(miles, " miles in http.service.ts")
    return this._http.post(`/api/miles/`, miles);
  };
  addStats(stats, Uid){
    return this._http.post(`/api/miles/stats/${Uid}`,stats);
  };
  editMiles(id, Uid, miles){
    console.log(miles, " miles in editMiles")
    return this._http.put(`/api/miles/${id}/${Uid}`, miles);
  };
  deleteMiles(id,Uid){
    console.log(Uid, " User id in delete miles http.service")
    return this._http.delete(`/api/miles/${id}/${Uid}`);
  };
  getMiles(){
    return this._http.get('/api/miles');
  };
  getStats(Uid){
    return this._http.get(`/api/miles/stats/${Uid}`)
  };
  getOne(id, Uid){
    return this._http.get(`/api/miles/${id}/${Uid}`);
  };
}