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
    public partial class MenuEditeControl : System.Web.UI.UserControl
    {
        private MenuView newmenuview = new MenuView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }
        }
        public void main() {
           
            menuedit.DataSource = newmenuview.GetAllMenu();
            menuedit.DataBind();
        }

        protected void menuedit_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            LinkButton lb = (LinkButton)e.Item.FindControl("menuedit");
            if (e.CommandName == "edit")
            {
                DataTable dt = newmenuview.GetMenuById(Convert.ToInt32(e.CommandArgument));

                menuname.Value = dt.Rows[0]["Menu"].ToString();
                menuurl.Value = dt.Rows[0]["Url"].ToString();

                lb.Text = "确定";
                lb.CommandName = "update";



            }
            else if (e.CommandName == "update")
            {

                lb.Text = "编辑";
                lb.CommandName = "edit";
                DataTable dt = newmenuview.UpdateMenuById(Convert.ToInt32(e.CommandArgument), menuname.Value, menuurl.Value);
                menuedit.DataSource = dt;
                menuedit.DataBind();
                main();
                menuname.Value= null;
                menuurl.Value = null;
            }
            if (e.CommandName == "delete")
            {
                DataTable dt = newmenuview.DeleteMenuById(Convert.ToInt32(e.CommandArgument));
                menuedit.DataSource = dt;
                menuedit.DataBind();
                main();
            }
            int i = 0;
            if (e.CommandName == "up") {
                i=-1;
            }
            if (e.CommandName == "down") {
                i=1;
            }
            if(i != 0){

             
               
                Label lb1 = menuedit.Items[e.Item.ItemIndex].FindControl("number") as Label;
                string sortid1 = lb1.Text;
                int id1 = e.Item.ItemIndex;

                Label lb2 = menuedit.Items[e.Item.ItemIndex + i].FindControl("number") as Label;
                string sortid2 = lb2.Text;
                int id2 = e.Item.ItemIndex+i;

                DataTable dt1 = newmenuview.UpdateMenuById(Convert.ToInt16(id1), Convert.ToInt16(sortid2));
                DataTable dt2 = newmenuview.UpdateMenuById(Convert.ToInt16(id2), Convert.ToInt16(sortid1));
                main();

            }
        }

        protected void submintbtn_Click(object sender, EventArgs e)
        {
            if (menuname.Value != "" || menuurl.Value != "")
            {
                DataTable dt = newmenuview.InsertMenu(menuname.Value, menuurl.Value);
                menuedit.DataSource = dt;
                menuedit.DataBind();
                main();
                menuname.Value = null;
                menuurl.Value = null;
            }

        }
      
    }
}