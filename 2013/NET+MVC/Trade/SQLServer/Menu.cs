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
    public class Menu:IMenu
    {
        private const string select_all_menus = "select * from Menu order by SortID asc";

        private const string delete_Menu = "delete from Menu where Id=@Id";
        private const string update_Menu = "update Menu set Menu=@Menu,Url=@Url where Id=@Id";
        private const string update_Sort = "update Menu set SortID=@SortID where Id=@Id ";
        private const string select_Menu_by_id = "select * from Menu where Id=@Id";
        private const string insert_Menu_by_id = "insert into Menu(Menu,Url) values(@Menu,@Url)";

        
        private const string parm_Id = "@Id";
        private const string parm_Menu = "@Menu";
        private const string parm_Url = "@Url";
        private const string parm_SortID = "@SortID";

        public IList<MenuInfo> GetMenus() { 

            IList<MenuInfo> menus = new List<MenuInfo>();

            using(SqlDataReader sdr = SqlHelper.ExcuteReader(SqlHelper.connectionstring,CommandType.Text,select_all_menus,null) ){
                while (sdr.Read()) {
                    MenuInfo newmenu = new MenuInfo(Convert.ToInt32(sdr[0]), sdr[1].ToString(), sdr[2].ToString(), Convert.ToInt32(sdr[3]));
                    menus.Add(newmenu);
                }
                return menus;
            
            }

        }
        public DataTable GetAllMenus() { 
          using(DataTable dt = SqlHelper.ExcuteDataTable( SqlHelper.connectionstring,CommandType.Text,select_all_menus,null )){
              return dt;
          }
        }
        public DataTable DeleteMenuById(int Id) {
            SqlParameter parms = new SqlParameter(parm_Id,SqlDbType.Int,50);
            parms.Value = Id;
            using(DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,delete_Menu,parms)){
                return dt;
             }
        }
        public DataTable UpdateMenuById(int Id, string Menu, string Url) {
            SqlParameter[] parms = new SqlParameter[]{
              new SqlParameter(parm_Id,SqlDbType.Int,50),
              new SqlParameter(parm_Menu,SqlDbType.VarChar,50),
              new SqlParameter(parm_Url,SqlDbType.VarChar,50)

            };
            parms[0].Value = Id;
            parms[1].Value = Menu;
            parms[2].Value = Url;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text,update_Menu, parms))
            {
                return dt;
            }
        }
        public DataTable UpdateMenuById(int Id, int SortID)
        {
            SqlParameter[] parms = new SqlParameter[]{
              
              new SqlParameter(parm_SortID,SqlDbType.Int,50),
              new SqlParameter(parm_Id,SqlDbType.Int,50)

            };
            
            parms[1].Value = SortID;
            parms[0].Value = Id;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text,update_Sort, parms))
            {
                return dt;
            }
        }
        public DataTable InsertMenu(string Menu, string Url) {
            SqlParameter[] parms = new SqlParameter[]{
              new SqlParameter(parm_Menu,SqlDbType.VarChar,50),
              new SqlParameter(parm_Url,SqlDbType.VarChar,50)
            };
            parms[0].Value = Menu;
            parms[1].Value = Url;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, insert_Menu_by_id, parms))
            {
                return dt;
            }
        }
        public DataTable GetMenuById(int Id)
        {
            SqlParameter parms = new SqlParameter(parm_Id, SqlDbType.Int, 50);
            parms.Value = Id;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text,select_Menu_by_id, parms))
            {
                return dt;
            }
        }
        


    }
}
