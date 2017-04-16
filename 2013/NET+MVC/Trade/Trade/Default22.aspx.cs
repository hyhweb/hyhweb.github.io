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

namespace Trade
{
    public partial class _Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack){
             //   Response.Write(HttpContext.Current.Profile.GetPropertyValue("loginname"));
             //   Response.Write(HttpContext.Current.Profile.GetPropertyValue("roleid"));


                //Session.Timeout = 20;
                //if (Application["name"] == null)
                //{

                //    Application["name"] = 1;
                //    Session["ss"] = Session.SessionID;

                //}
                //else if (Session["ss"] + "" != Session.SessionID)
                //{
                //    Session["ss"] = Session.SessionID;
                //    int count = Convert.ToInt32(Application["name"].ToString());
                //    count++;
                //    Application["name"] = count;
                //}
                //Response.Write(Application["name"]);
                
               
                
            }

            
           
        }
    }
}
