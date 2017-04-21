import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions,URLSearchParams } from  '@angular/http';
//import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map'

@Injectable()
export class UserService{
	constructor(private http:Http){
	}
	getUserList(params) {
		
      return  this.http.get("/app/data/userlist.json",{ search:params}).map((res:Response) => res.json());
   }
}