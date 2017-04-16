using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;


namespace DBUtility
{
    public abstract class SqlHelper
    {
        public static string connectionstring = ConfigurationManager.ConnectionStrings["connectstring"].ConnectionString;

        public static SqlDataReader ExcuteReader(string connectionstring,CommandType cmdType,string cmdText,params SqlParameter[] cmdParms) {
            SqlConnection con = new SqlConnection(connectionstring);
            SqlCommand cmd = new SqlCommand();
            try
            {
                PrepareCommand(cmd, con, null, cmdType, cmdText, cmdParms);
                // SqlDataReader sdr = new SqlDataReader();
                SqlDataReader sdr = cmd.ExecuteReader();
                return sdr;
            }
            catch
            {
                con.Close();
                throw;
            }
        }
        //返回table
        public static DataTable ExcuteDataTable(string connectionstring, CommandType cmdType, string cmdText, params SqlParameter[] cmdParms) {
            SqlCommand cmd = new SqlCommand();
            using (SqlConnection con = new SqlConnection(connectionstring)) {
                PrepareCommand(cmd,con,null,cmdType,cmdText,cmdParms);
                DataTable table = new DataTable();
                SqlDataAdapter sda = new SqlDataAdapter(cmd);
                sda.Fill(table);
                
                return table;
            }
        }
        //cmd配置函数
        private static void PrepareCommand(SqlCommand cmd,SqlConnection con, SqlTransaction trans, CommandType cmdType,string cmdText,SqlParameter[] cmdParms ) {
            if (con.State != ConnectionState.Open) {
                con.Open();
            }
            cmd.Connection = con;
            cmd.CommandType = cmdType;
            cmd.CommandText = cmdText;
            if (trans != null) {
                cmd.Transaction = trans;
            }
            if (cmdParms != null) { 
              foreach( SqlParameter parm in cmdParms){
                  cmd.Parameters.Add(parm);
              }
            }
        }

    }
}
