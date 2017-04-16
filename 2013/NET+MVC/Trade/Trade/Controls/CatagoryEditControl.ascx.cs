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
    public partial class CatagoryEditControl : System.Web.UI.UserControl
    {
        public CatagoryView catagoryview = new CatagoryView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }

        }
        public void main() {
          
            catagory.DataSource = catagoryview.GetAllCatagory();
            catagory.DataBind();
        }

        protected void catagory_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            LinkButton lb = (LinkButton)e.Item.FindControl("catagoryedit");
            if (e.CommandName == "edit")
            {
                DataTable dt = catagoryview.GetCatagorysById(Convert.ToInt32(e.CommandArgument));

                catagoryname.Value = dt.Rows[0]["Catagory"].ToString();
                catagoryurl.Value = dt.Rows[0]["Url"].ToString();

                lb.Text = "确定";
                lb.CommandName = "update";



            }
            else if (e.CommandName == "update")
            {

                lb.Text = "编辑";
                lb.CommandName = "edit";
                DataTable dt = catagoryview.UpdateCatagorysById(Convert.ToInt32(e.CommandArgument), catagoryname.Value, catagoryurl.Value);
                catagory.DataSource = dt;
                catagory.DataBind();
                main();
                catagoryname.Value = null;
                catagoryurl.Value = null;
            }
            if (e.CommandName == "delete")
            {
                DataTable dt = catagoryview.DeleteCatagorysById(Convert.ToInt32(e.CommandArgument));
                catagory.DataSource = dt;
                catagory.DataBind();
                main();
            }
        }

        protected void submintbtn_Click(object sender, EventArgs e)
        {
            if (catagoryname.Value != "" || catagoryurl.Value != "")
            {
                DataTable dt = catagoryview.InsertCatagorysById(catagoryname.Value, catagoryurl.Value);
                catagory.DataSource = dt;
                catagory.DataBind();
                main();
                catagoryname.Value = null;
                catagoryurl.Value = null;
            }
        }

        
        

    }
}