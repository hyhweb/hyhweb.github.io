using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using Model;
using IDAL;
using DBUtility;

namespace SQLServerDAL
{
    public class User:IUser
    {
        private const string select_users = "select * from [User] where UserName=@UserName and PassWord=@PassWord";
        private const string select_all_users = "select * from [User]";
        private const string parm_username = "@UserName";
        private const string parm_password = "@password";
        private const string parm_roleid = "@RoleId";
        public DataTable GetUsers(string UserName, string PassWord)
        {
            
             SqlParameter[] parameters = new SqlParameter[]{
             new SqlParameter(parm_username,SqlDbType.VarChar,50),
             new SqlParameter(parm_password,SqlDbType.VarChar,50)
             };
             parameters[0].Value = UserName;
             parameters[1].Value = PassWord;
             using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_users,parameters)){
                 return dt;
             }
            
        }
        public DataTable GetAllUsers(){
            using(DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_all_users,null)){
                    return dt;
            }
        
        }






        
    }
}
