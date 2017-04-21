import { Component } from '@angular/core';
import {UserService} from '../services/UserService';
import {Observable} from 'rxjs/Rx';
import {URLSearchParams } from  '@angular/http';

@Component({
  selector: 'my-userlist',
  template: `
  <div class="panel panel-default">
		<div class="panel-heading">用户列表</div>
		<div class="panel-body">
			
		  <table class="table table-bordered table-hover">
		  <thead>
		  	<tr>
		  		<td>姓名</td>
		  		<td>职业</td>
		  		<td>手机号码</td>
		  	</tr>
		  </thead>
		  <tbody>
		  <tr *ngFor="let user of userlist" >
		  		<td> {{user.name}} </td>
		  		<td> {{user.role}} </td>
		  		<td> {{user.phone}} </td>
		    
		  </tr>
		  </tbody>
		  </table>
		  </div>
  </div>
  `,
})
export class UserList  { 
		
		public userlist;
		
		constructor(private _userService:UserService){}
		ngOnInit(){
			this.getFoods();
		}
	  getFoods() {
	    this._userService.getUserList().subscribe(
	      // the first argument is a function which runs on success
	      data => { this.userlist = data; },
	      // the second argument is a function which runs on error
	      err => console.error(err),
	      // the third argument is a function which runs on completion
	      () => console.log('done loading foods',this.userlist)
	    );
	  }



}