import { Component } from '@angular/core';
import {LoginService} from '../services/loginService';
import {Observable} from 'rxjs/Rx';
import {URLSearchParams } from  '@angular/http';

@Component({
  selector: 'my-app',
  template: `<router-outlet>
  </router-outlet>
  `,
})
export class App  {
	ngOnInit(){
		
	}
}