System.register(["@angular/core", "@angular/common", "@angular/platform-browser", "@angular/router", "@angular/http", "@angular/forms", "./components/login", "./services/UserService", "./components/userlist", "./views/App", "./services/loginService"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, platform_browser_1, router_1, http_1, forms_1, login_1, UserService_1, userlist_1, App_1, loginService_1, appChildRoutes, appRoutes, PcModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (login_1_1) {
                login_1 = login_1_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            },
            function (userlist_1_1) {
                userlist_1 = userlist_1_1;
            },
            function (App_1_1) {
                App_1 = App_1_1;
            },
            function (loginService_1_1) {
                loginService_1 = loginService_1_1;
            }
        ],
        execute: function () {
            // 定义常量 嵌套自路由
            appChildRoutes = [
                { path: "one", component: login_1.Login },
                { path: "two", component: login_1.Login },
                // 如果地址栏中输入没有定义的路由就跳转到one路由界面
                {
                    path: '**', redirectTo: "one"
                }
            ];
            // 定义常量 路由
            appRoutes = [
                { path: '', component: login_1.Login },
                {
                    path: 'userlist',
                    component: userlist_1.UserList
                    //,
                    // children: appChildRoutes
                }
            ];
            PcModule = (function () {
                function PcModule() {
                }
                return PcModule;
            }());
            PcModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, router_1.RouterModule.forRoot(appRoutes)],
                    declarations: [App_1.App, login_1.Login, userlist_1.UserList],
                    //providers:[LoginService],
                    providers: [loginService_1.LoginService, UserService_1.UserService, { provide: common_1.APP_BASE_HREF, useValue: '/' }],
                    schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA],
                    bootstrap: [App_1.App]
                })
            ], PcModule);
            exports_1("PcModule", PcModule);
        }
    };
});
//# sourceMappingURL=app.module.js.map