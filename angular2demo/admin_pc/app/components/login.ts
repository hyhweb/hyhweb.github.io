import { Component } from '@angular/core';
import {LoginService} from '../services/loginService';
import {Observable} from 'rxjs/Rx';
import {URLSearchParams } from  '@angular/http';

@Component({
  selector: 'my-login',
  template: `
  <div class="panel panel-default">
		<div class="panel-heading">登陆</div>
		<div class="panel-body">
			
		
			<ul class="form-horizontal">
		  <li class="form-group"><label  class="col-sm-2">用户名:</label><div class="col-sm-5"> <input class="form-control" type="text" [(value)]="name" /></div></li>
		  <li class="form-group"><label  class="col-sm-2">密码:</label><div  class="col-sm-5"><input class="form-control"  type="password" [(value)]="pwd" /></div></li>
		  <li class="form-group">
		  <div  class="col-sm-5 col-sm-offset-2">
		  <button class="btn btn-primary login">登录</button>
		  </div>
		  </li>
		  </ul>
		  </div>
  </div>
  
  `,
})
export class Login  { 
		
		public result;
		public name ='hong';
		public pwd ='123456789132';
		
		constructor(private _loginService:LoginService){}
		ngOnInit(){
			let self = this;
			$('.login').on('click',function(){
				let params = new URLSearchParams();
				params.set('name', self.name);
				params.set('pwd', self.pwd);
				console.log(params.toString()) // name=huge
				 self.getLogin(params);
		    	console.log(this.foods);
			})
		}
	  getLogin() {
	    this._loginService.getLogin().subscribe(
	      // the first argument is a function which runs on success
	      data => { 
	      	this.result = data;
	      	if(data.code ==200){
	      		location.href="/userlist"
	      	}
	      },
	      // the second argument is a function which runs on error
	      err => console.error(err),
	      // the third argument is a function which runs on completion
	      () => console.log('done loading result',this.result)
	    );
	  }



}