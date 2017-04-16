using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
     public class MenuView
    {
         private static readonly Menu menu = new Menu() ;

         public IList<MenuInfo> GetMenu() {
             return menu.GetMenus();
         }
         public DataTable GetAllMenu() {
             return menu.GetAllMenus();
         }


         public DataTable DeleteMenuById(int Id)
         {
             return menu.DeleteMenuById(Id);
         }
         public DataTable UpdateMenuById(int Id, string Menu, string Url)
         {
             return menu.UpdateMenuById(Id, Menu, Url);
         }
         public DataTable UpdateMenuById(int Id, int SortID)
         {
             return menu.UpdateMenuById(Id, SortID);
         }
         public DataTable GetMenuById(int Id)
         {
             return menu.GetMenuById(Id);
         }
         public DataTable InsertMenu(string Menu, string Url)
         {
             return menu.InsertMenu( Menu, Url);
         }


        

    }
}
