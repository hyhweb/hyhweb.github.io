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
    public partial class Footer : System.Web.UI.UserControl
    {
        public CompanyView newcompany= new CompanyView();
        public MenuView newmenuview = new MenuView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                main();
            }
        }
        protected void main() {
            footermenu.DataSource = newmenuview.GetMenu();
            footermenu.DataBind();
            footercompany.DataSource = newcompany.GetCompany();
            footercompany.DataBind();
        }
    }
}