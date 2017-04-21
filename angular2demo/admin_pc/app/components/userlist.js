System.register(["@angular/core", "../services/UserService"], function (exports_1, context_1) {
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
    var core_1, UserService_1, UserList;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (UserService_1_1) {
                UserService_1 = UserService_1_1;
            }
        ],
        execute: function () {
            UserList = (function () {
                function UserList(_userService) {
                    this._userService = _userService;
                }
                UserList.prototype.ngOnInit = function () {
                    this.getFoods();
                };
                UserList.prototype.getFoods = function () {
                    var _this = this;
                    this._userService.getUserList().subscribe(
                    // the first argument is a function which runs on success
                    function (data) { _this.userlist = data; }, 
                    // the second argument is a function which runs on error
                    function (err) { return console.error(err); }, 
                    // the third argument is a function which runs on completion
                    function () { return console.log('done loading foods', _this.userlist); });
                };
                return UserList;
            }());
            UserList = __decorate([
                core_1.Component({
                    selector: 'my-userlist',
                    template: "\n  <div class=\"panel panel-default\">\n\t\t<div class=\"panel-heading\">\u7528\u6237\u5217\u8868</div>\n\t\t<div class=\"panel-body\">\n\t\t\t\n\t\t  <table class=\"table table-bordered table-hover\">\n\t\t  <thead>\n\t\t  \t<tr>\n\t\t  \t\t<td>\u59D3\u540D</td>\n\t\t  \t\t<td>\u804C\u4E1A</td>\n\t\t  \t\t<td>\u624B\u673A\u53F7\u7801</td>\n\t\t  \t</tr>\n\t\t  </thead>\n\t\t  <tbody>\n\t\t  <tr *ngFor=\"let user of userlist\" >\n\t\t  \t\t<td> {{user.name}} </td>\n\t\t  \t\t<td> {{user.role}} </td>\n\t\t  \t\t<td> {{user.phone}} </td>\n\t\t    \n\t\t  </tr>\n\t\t  </tbody>\n\t\t  </table>\n\t\t  </div>\n  </div>\n  ",
                }),
                __metadata("design:paramtypes", [UserService_1.UserService])
            ], UserList);
            exports_1("UserList", UserList);
        }
    };
});
//# sourceMappingURL=userlist.js.map