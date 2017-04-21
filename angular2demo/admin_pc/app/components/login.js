System.register(["@angular/core", "../services/loginService", "@angular/http"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, loginService_1, http_1, Login;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (loginService_1_1) {
                loginService_1 = loginService_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }
        ],
        execute: function () {
            Login = (function () {
                function Login(_loginService) {
                    this._loginService = _loginService;
                    this.name = 'hong';
                    this.pwd = '123456789132';
                }
                Login.prototype.ngOnInit = function () {
                    var self = this;
                    $('.login').on('click', function () {
                        var params = new http_1.URLSearchParams();
                        params.set('name', self.name);
                        params.set('pwd', self.pwd);
                        console.log(params.toString()); // name=huge
                        self.getLogin(params);
                        console.log(this.foods);
                    });
                };
                Login.prototype.getLogin = function () {
                    var _this = this;
                    this._loginService.getLogin().subscribe(
                    // the first argument is a function which runs on success
                    function (data) {
                        _this.result = data;
                        if (data.code == 200) {
                            location.href = "/userlist";
                        }
                    }, 
                    // the second argument is a function which runs on error
                    function (err) { return console.error(err); }, 
                    // the third argument is a function which runs on completion
                    function () { return console.log('done loading result', _this.result); });
                };
                return Login;
            }());
            Login = __decorate([
                core_1.Component({
                    selector: 'my-login',
                    template: "\n  <div class=\"panel panel-default\">\n\t\t<div class=\"panel-heading\">\u767B\u9646</div>\n\t\t<div class=\"panel-body\">\n\t\t\t\n\t\t\n\t\t\t<ul class=\"form-horizontal\">\n\t\t  <li class=\"form-group\"><label  class=\"col-sm-2\">\u7528\u6237\u540D:</label><div class=\"col-sm-5\"> <input class=\"form-control\" type=\"text\" [(value)]=\"name\" /></div></li>\n\t\t  <li class=\"form-group\"><label  class=\"col-sm-2\">\u5BC6\u7801:</label><div  class=\"col-sm-5\"><input class=\"form-control\"  type=\"password\" [(value)]=\"pwd\" /></div></li>\n\t\t  <li class=\"form-group\">\n\t\t  <div  class=\"col-sm-5 col-sm-offset-2\">\n\t\t  <button class=\"btn btn-primary login\">\u767B\u5F55</button>\n\t\t  </div>\n\t\t  </li>\n\t\t  </ul>\n\t\t  </div>\n  </div>\n  \n  ",
                }),
                __metadata("design:paramtypes", [loginService_1.LoginService])
            ], Login);
            exports_1("Login", Login);
        }
    };
});
//# sourceMappingURL=login.js.map