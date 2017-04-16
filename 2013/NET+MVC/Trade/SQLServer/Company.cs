using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using IDAL;
using Model;
using DBUtility;

namespace SQLServerDAL
{
     public class Company
     {
         private const string select_companys = "select * from Company";
         private const string select_company_by_id = "select * from Company where Id=@Id";
         private const string update_companys = "update Company set Company=@Company,Address=@Address,City=@City,Telephone=@Telephone,Mobilephone=@Mobilephone,Fax=@Fax,Email=@Email where Id=@Id";
         private const string parm_Id = "@Id";
         private const string parm_Company = "@Company";
         private const string parm_Address = "@Address";
         private const string parm_City = "@City";
         private const string parm_Telephone = "@Telephone";
         private const string parm_Mobilephone = "@Mobilephone";
         private const string parm_Fax = "@Fax";
         private const string parm_Email = "@Email";

         public DataTable GetCompany() {
           using(DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_companys,null) ){
               return dt;
           }
         }
         public DataTable SelectCompanyById( int id) {
             SqlParameter parms = new SqlParameter(parm_Id,SqlDbType.Int,50);
             parms.Value = id;
            using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_company_by_id,parms) ){
                return dt;
            }
         }
         public DataTable UpdateCompany( int Id, string Company,string Address,string City,string Telephone,string Mobilephone,string Fax,string Email) 
         {
             SqlParameter[] parms = new SqlParameter[]{
               new SqlParameter(parm_Id,SqlDbType.Int,50),
               new SqlParameter(parm_Company,SqlDbType.VarChar,100),
               new SqlParameter(parm_Address,SqlDbType.VarChar,100),
               new SqlParameter(parm_City,SqlDbType.VarChar,100),
               new SqlParameter(parm_Telephone,SqlDbType.VarChar,100),
               new SqlParameter(parm_Mobilephone,SqlDbType.VarChar,100),
               new SqlParameter(parm_Fax,SqlDbType.VarChar,100),
               new SqlParameter(parm_Email,SqlDbType.VarChar,100),
             };
             parms[0].Value = Id;
             parms[1].Value = Company;
             parms[2].Value = Address;
             parms[3].Value = City;
             parms[4].Value = Telephone;
             parms[5].Value = Mobilephone;
             parms[6].Value = Fax;
             parms[7].Value = Email;
             using( DataTable dt=SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,update_companys,parms)){
                 return dt;
             }
         
         }
     }
}
