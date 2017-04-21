import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from  '@angular/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class LoginService{
	constructor(private http:Http){
	}
	getLogin(params) {
		
      return  this.http.get("/app/data/login.json",{ search:params}).map((res:Response) => res.json());
   }
}
