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
using Model;

namespace Trade.Controls
{
    public partial class LoginControl : System.Web.UI.UserControl
    {
        private UserView userview = new UserView();
        protected void Page_Load(object sender, EventArgs e)
        {
            //if (!IsPostBack) {
            //    main();
            //}


        }
        //public void main() {
        //    Response.Write(SqlHelper.connectionstring);
            
        //    datagrid1.DataSource = userview.GetUser("weng", "wanyi");
        //    datagrid1.DataBind();
        //    //datagrid1.DataSource = userview.GetAllUser();
        //    //datagrid1.DataBind();
        //}
        
        protected void loginbtn_Click(object sender, EventArgs e)
        {
            DataTable dt = userview.GetUser(loginuser.Text, loginpwd.Text);
            if (dt.Rows.Count > 0) {

                
             //   HttpContext.Current.Profile.SetPropertyValue("loginname",loginuser.Text);
             //   HttpContext.Current.Profile.SetPropertyValue("roleid", dt.Rows[0]["RoleId"]);
                Session["loginname"] = loginuser.Text;
                Session["roleid"] = dt.Rows[0]["RoleId"];
               // Session["roleid"] = dt.Rows[0]["RoleId"];
                Response.Redirect("Product.aspx");
            }
            else
            { Response.Write("<script>alert('Login Error')</script>");
           // HttpContext.Current.Profile.SetPropertyValue("roleid","");
            };

        }
    }
}