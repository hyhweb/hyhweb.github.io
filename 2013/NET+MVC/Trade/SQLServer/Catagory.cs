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
    public  class Catagory
    {
        private const string select_all_catogory = "select * from Catagory";

        private const string delete_Catagory = "delete from Catagory where Id=@Id";
        private const string update_Catagory = "update Catagory set Catagory=@Catagory,Url=@Url where Id=@Id";
        private const string select_Catagory_by_id = "select * from Catagory where Id=@Id";
        private const string insert_Catagory = "insert into Catagory(Catagory,Url) values(@Catagory,@Url)";


        private const string parm_Id = "@Id";
        private const string parm_Catagory = "@Catagory";
        private const string parm_Url = "@Url";

        public DataTable GetCatagorys() { 
            using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_all_catogory,null) ){
                return dt;
            }
        
        }

        public DataTable DeleteCatagorysById(int Id) {

            SqlParameter parms = new SqlParameter(parm_Id,SqlDbType.Int,50);
            parms.Value = Id;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, delete_Catagory, parms))
            {
                return dt;
            }
        
        }
        public DataTable UpdateCatagorysById(int Id, string Catagory, string Url) {

            SqlParameter[] parms = new SqlParameter[]{
              new SqlParameter(parm_Id,SqlDbType.Int,50),
              new SqlParameter(parm_Catagory,SqlDbType.VarChar,50),
              new SqlParameter(parm_Url,SqlDbType.VarChar,50)

            };
            parms[0].Value = Id;
            parms[1].Value = Catagory;
            parms[2].Value = Url;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, update_Catagory, parms))
            {
                return dt;
            }
        }
        public DataTable InsertCatagorysById(string Catagory, string Url) {

            SqlParameter[] parms = new SqlParameter[]{
              new SqlParameter(parm_Catagory,SqlDbType.VarChar,50),
              new SqlParameter(parm_Url,SqlDbType.VarChar,50)

            };
            parms[0].Value = Catagory;
            parms[1].Value = Url;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, insert_Catagory, parms))
            {
                return dt;
            }
        }
        public DataTable GetCatagorysById(int Id)
        {
            SqlParameter parms = new SqlParameter(parm_Id, SqlDbType.Int, 50);
            parms.Value = Id;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, select_Catagory_by_id, parms))
            {
                return dt;
            }
        }






    }
}
