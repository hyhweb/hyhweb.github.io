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
    public partial class PayMentEditControl : System.Web.UI.UserControl
    {
        private OtherPageView newotherpage = new OtherPageView();
       
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack){
              main();
            }
        }
        protected void main() {
            string pagename = Request.QueryString["pagename"];
            DataTable dt = newotherpage.GetPageByName(pagename);
            content.Value = dt.Rows[0]["PageText"].ToString();
            
        }

        protected void submit_Click(object sender, EventArgs e)
        {
            string pagename = Request.QueryString["pagename"];
            newotherpage.UpDatePageByName(pagename, content.InnerHtml.ToString());
            Response.Write("<script>alert('ddd')</script>");
          //  main();
            
        }

        protected void submit_Click1(object sender, EventArgs e)
        {
            string pagename = Request.QueryString["pagename"];
            newotherpage.UpDatePageByName(pagename, content.Value);
        
             main();
        }
    }
}