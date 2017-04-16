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
     public class Message:IMessage
    {
         private const string select_all_message = "select * from Message";
         private const string select_by_person = "select * from Message where ContactPerson=@ContactPerson";
         private const string insert_message = "insert into Message(MessageTitle,MessageText,CompanyName,Country,ContactPerson,Phone,Email) values(@MessageTitle,@MessageText,@CompanyName,@Country,@ContactPerson,@Phone,@Email)";
         private const string delete_by_id = "delete Message where Id=@Id";
         private const string parm_ContactPerson = "@ContactPerson";
         private const string parm_id="@Id";
         private const string parm_MessageTitle = "@MessageTitle";
         private const string parm_MessageText = "@MessageText";
         private const string parm_CompanyName = "@CompanyName";
         private const string parm_Country = "@Country";
         private const string parm_Phone = "@Phone";
         private const string parm_Email = "@Email";

         public DataTable GetMessages(){
            using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_all_message,null) ){
                 return dt;
            }
         }
         public DataTable DeleteMessage(int id)
         {

             SqlParameter parms = new SqlParameter(parm_id, SqlDbType.Int,50);
             parms.Value = id;
                
            
           using(  DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,delete_by_id,parms) ){
               return dt;
           }
         }
         public DataTable GetMessageByPerson(string person) {
             SqlParameter parms = new SqlParameter(parm_ContactPerson, SqlDbType.Char, 50);
             parms.Value = person;


             using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, select_by_person, parms))
             {
                 return dt;
             }
         }
         public DataTable InsertMesages(string MessageTitle,string MessageText,string CompanyName,string Country,string ContactPerson,string Phone,string Email) {
             SqlParameter[] parms = new SqlParameter[]{
               new SqlParameter(parm_MessageTitle, SqlDbType.Char, 200),
               new SqlParameter(parm_MessageText, SqlDbType.Char, 1000),
               new SqlParameter(parm_CompanyName, SqlDbType.Char, 200),
               new SqlParameter(parm_Country, SqlDbType.Char, 200),
               new SqlParameter(parm_ContactPerson, SqlDbType.Char, 200),
               new SqlParameter(parm_Phone, SqlDbType.Char, 100),
               new SqlParameter(parm_Email, SqlDbType.Char, 100),
             };
            parms[0].Value= MessageText;
            parms[1].Value= MessageText;
            parms[2].Value= CompanyName;
            parms[3].Value= Country;
            parms[4].Value= ContactPerson;
            parms[5].Value= Phone;
            parms[6].Value = Email;
             using( DataTable dt =SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,insert_message,parms) ){
                 return dt;
             }
       
          
         }
    }
}
