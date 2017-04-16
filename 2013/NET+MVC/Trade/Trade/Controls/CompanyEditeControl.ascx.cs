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
    public partial class CompanyEditeControl : System.Web.UI.UserControl
    {
        public CompanyView companyview = new CompanyView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if(!IsPostBack){
                main();
            }

        }
        protected void main(){
            companyedite.DataSource=companyview.GetCompany();
            companyedite.DataBind();
        }

        protected void companyedite_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            LinkButton lb = (LinkButton)e.Item.FindControl("editbtn");
            if (e.CommandName == "edit")
            {
                DataTable dt = companyview.SelectCompanyById(Convert.ToInt32(e.CommandArgument));
                company.Value = dt.Rows[0]["Company"].ToString();
                address.Value = dt.Rows[0]["Address"].ToString(); 
                city.Value = dt.Rows[0]["City"].ToString(); 
                telephone.Value = dt.Rows[0]["Telephone"].ToString(); 
                mobilephone.Value = dt.Rows[0]["Mobilephone"].ToString(); 
                fax.Value = dt.Rows[0]["Fax"].ToString(); 
                email.Value = dt.Rows[0]["Email"].ToString(); 
               
                lb.Text = "确定";
                lb.CommandName = "update";



            }
            else if (e.CommandName == "update")
            {

                lb.Text = "编辑";
                lb.CommandName = "edit";
                DataTable dt = companyview.UpdateCompany(Convert.ToInt32(e.CommandArgument), company.Value, address.Value, city.Value, telephone.Value, mobilephone.Value, fax.Value, email.Value);
                companyedite.DataSource = dt;
                companyedite.DataBind();
                main();
                company.Value=null;
                address.Value=null;
                city.Value=null;
                telephone.Value=null;
                mobilephone.Value=null;
                fax.Value=null;
                email.Value = null;
            }
        }
    }
}