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
    public class Comment
    {
        private const string select_comment = "select * from Comment where Id=@Id";
        private const string parm_Id = "@Id";
        public DataTable GetCommentById(int id) {
            SqlParameter parms = new SqlParameter(parm_Id,SqlDbType.Int,50);
            parms.Value = id;
            using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_comment,parms) ){
                return dt;
            }
        }


    }
}
