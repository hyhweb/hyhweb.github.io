using System;
using System.Collections;
using System.Configuration;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using System.Web.UI.WebControls.WebParts;
using System.Xml.Linq;
using BLL;
using DBUtility;

namespace Trade.Controls
{
    public partial class MenuControl : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }
        public void main() {
            MenuView newmenuview = new MenuView();
            menu.DataSource = newmenuview.GetMenu(); ;
            menu.DataBind();
            //menuid.DataSource = newmenuview.GetMenu();
            //menuid.DataBind();
        
        }
    }
}