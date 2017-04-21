import { NgModule,CUSTOM_ELEMENTS_SCHEMA }  from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import { HttpModule } from '@angular/http';

// 表单 双向数据绑定
import { FormsModule } from '@angular/forms';

import { Login } from './components/login';
import {UserService} from './services/UserService';
import { UserList } from './components/userlist';
import { App } from './views/App';
import {LoginService} from './services/loginService'
// 定义常量 嵌套自路由
   const appChildRoutes: Routes = [
     {path: "one", component: Login},
     {path: "two", component: Login},
     // 如果地址栏中输入没有定义的路由就跳转到one路由界面
     {
       path: '**', redirectTo: "one"
     }
   ];
   // 定义常量 路由
   const appRoutes:Routes = [
     {path: '', component: Login},
     {
       path: 'userlist',
       component: UserList
       //,
      // children: appChildRoutes
      }
   ];
   
@NgModule({
	imports:[BrowserModule,HttpModule,FormsModule,RouterModule.forRoot(appRoutes)],
	declarations:[App,Login,UserList],
	//providers:[LoginService],
	providers: [LoginService,UserService,{ provide: APP_BASE_HREF, useValue: '/' }],
	schemas:[CUSTOM_ELEMENTS_SCHEMA],
	bootstrap:[App]
})

export class PcModule { }


