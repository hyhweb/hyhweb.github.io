using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;

namespace IDAL
{
    public interface IMenu
    {
        IList<MenuInfo> GetMenus();
        DataTable DeleteMenuById(int Id);
        DataTable UpdateMenuById(int Id, string Menu, string Url);
        DataTable InsertMenu(string Menu, string Url);
    }
}
