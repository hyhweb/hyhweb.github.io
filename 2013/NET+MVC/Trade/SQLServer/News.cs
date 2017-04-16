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
     public class News:INews
    {
         private const string select_all_news = "select * from News";
         private const string delete_news = "delete from News where Id=@Id";
         private const string update_news = "update News set NewsTitle=@NewsTitle,NewsText=@NewsText where Id =@Id";
         private const string select_news_by_id = "select * from News where Id=@Id";
         private const string inser_news_by_id = "insert into News(NewsTitle,NewsText) values(@NewsTitle,@NewsText)";
         private const string parm_id = "@Id";
         private const string parm_NewsTitle = "@NewsTitle";
         private const string parm_NewsText = "@NewsText";



         public DataTable GetNews() { 
          using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_all_news,null) ){
              return dt;
          }
         
         }
         public DataTable DeleteNewsById(int Id) {
             SqlParameter parms = new SqlParameter(parm_id,SqlDbType.Int,50);
             parms.Value = Id;
             using(DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,delete_news,parms)){
                 return dt;
             }   
         }
         public DataTable UpdateNewsById(int Id,string NewsTitle,string NewsText) { 
           SqlParameter[] parms = new SqlParameter[]{
            new SqlParameter(parm_id,SqlDbType.Int,50),
            new SqlParameter(parm_NewsTitle,SqlDbType.VarChar,50),
            new SqlParameter(parm_NewsText,SqlDbType.VarChar,500)
           };
           parms[0].Value = Id;
           parms[1].Value = NewsTitle;
           parms[2].Value = NewsText;
             using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,update_news,parms ) ){
                 return dt;
             }
         }
         public DataTable GetNewsById(int Id) {
             SqlParameter parms = new SqlParameter(parm_id, SqlDbType.Int, 50);
             parms.Value = Id;
             using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text,select_news_by_id, parms))
             {
                 return dt;
             }   
         }
         public DataTable InsertNewsById(string NewsTitle, string NewsText)
         {
             SqlParameter[] parms = new SqlParameter[]{
            new SqlParameter(parm_NewsTitle,SqlDbType.VarChar,50),
            new SqlParameter(parm_NewsText,SqlDbType.VarChar,500)
           };
             parms[0].Value = NewsTitle;
             parms[1].Value = NewsText;
             using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text,inser_news_by_id, parms))
             {
                 return dt;
             }
         
         }
    }
}
