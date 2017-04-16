using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
    public class UserView
    {
        private static readonly User newuser = new User();

        public DataTable GetUser(string username,string password) {
           return   newuser.GetUsers(username, password);
        }
        public DataTable GetAllUser() {
            return newuser.GetAllUsers();
        }
        
    }
}
