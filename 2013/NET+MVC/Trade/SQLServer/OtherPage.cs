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
     public class OtherPage
    {
         private const string select_by_name = "select * from OtherPage where PageName=@PageName";
        
         private const string updatepage_by_name = "update OtherPage set PageText=@PageText where PageName=@PageName";
         private const string parms_pagename = "@PageName";
         private const string parms_pagetext = "@PageText";

         public DataTable GetPageByName(string name) {
             SqlParameter parms = new SqlParameter(parms_pagename, SqlDbType.Char, 50);
             parms.Value = name;
             using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_by_name,parms) ){
                 return dt;
             }
         }
         public DataTable UpDatePageByName(string name, string pagetext) {
             SqlParameter[] parms = new SqlParameter[]{
              new SqlParameter(parms_pagename, SqlDbType.Char, 50),
              new SqlParameter(parms_pagetext, SqlDbType.Char, 2000)
            };
             parms[0].Value = name;
             parms[1].Value = pagetext;
             using( DataTable dt=SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,updatepage_by_name,parms) ){
                 return dt;
             }

         }
    }
}
