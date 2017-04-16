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
    public partial class CompanyControl : System.Web.UI.UserControl
    {
        public CompanyView companyview = new CompanyView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack){
                main();
            }

        }
        protected void main(){
            company.DataSource=companyview.GetCompany();
            company.DataBind();
        }
    }
}