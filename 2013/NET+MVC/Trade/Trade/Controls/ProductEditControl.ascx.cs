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
    public partial class ProductEditControl : System.Web.UI.UserControl
    {
        public ProductView newproductview = new ProductView();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack) {
                main();
            }

        }
        public void main() {
            
            DataTable dt = newproductview.GetAllProducts();
            PagedDataSource pds = GetPds(10,dt, pageprev, pagenext, firstpage, lastpage, HyperLink1, HyperLink2, HyperLink3, HyperLink4, HyperLink5);
            adproductedit.DataSource = pds;
            adproductedit.DataBind();
            
            //productdatagrid.DataSource = newproductview.GetAllProducts();
            //productdatagrid.DataBind();
        }

        public PagedDataSource GetPds(int pagesize,DataTable dt, HyperLink prevpage, HyperLink nextpage, HyperLink firstpage, HyperLink lastpage, HyperLink page1, HyperLink page2, HyperLink page3, HyperLink page4, HyperLink page5)
        {
            PagedDataSource pds = new PagedDataSource();
            pds.DataSource = dt.DefaultView;
            pds.AllowPaging = true;
            pds.PageSize = pagesize;
            int currentpage;
            if (Request.QueryString["page"] != null)
            {
                currentpage = Convert.ToInt32(Request.QueryString["page"]);
            }
            else {
                currentpage = 0;
            }
            pds.CurrentPageIndex = currentpage;
            if (!pds.IsFirstPage) {
                prevpage.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage-1);
            }
            if(!pds.IsLastPage){
                nextpage.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage + 1);
            }
            firstpage.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(0);
            lastpage.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(pds.PageCount-1);

            if (!pds.IsFirstPage || !pds.IsLastPage||currentpage > 3 || currentpage < pds.PageCount - 3) {
                if (pds.PageCount - 1 <= currentpage) { currentpage = pds.PageCount - 5; };
                if (0 >= currentpage) { currentpage =0; };
                page1.Text = Convert.ToString(currentpage);
                page1.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage);

                page2.Text = Convert.ToString(currentpage +1);
                page2.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage+1);
                page3.Text = Convert.ToString(currentpage + 2);
                page3.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage + 2);
                page4.Text = Convert.ToString(currentpage + 3);
                page4.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage +3);
                page5.Text = Convert.ToString(currentpage + 4);
                page5.NavigateUrl = Request.CurrentExecutionFilePath + "?page=" + Convert.ToString(currentpage +4);

            }
           

            
            return pds;
        }

        protected void adproductedit_ItemCommand(object source, RepeaterCommandEventArgs e)
        {
            LinkButton lb = (LinkButton)e.Item.FindControl("editbtn");
            if (e.CommandName == "edit") { 
              DataTable dt = newproductview.GetProductById( Convert.ToInt32(e.CommandArgument));
              filetext.Style.Add("display", "inline-block;");
              filetext.Text = dt.Rows[0]["ProductUrl"].ToString();
              producttitle.Value = dt.Rows[0]["ProductTitle"].ToString();
              productcatagory.Value = dt.Rows[0]["ProductCatagory"].ToString();
              productkeyword.Value = dt.Rows[0]["ProductKeyWord"].ToString();
              productprice.Value = dt.Rows[0]["ProductPrice"].ToString();
              productcomment.Value = dt.Rows[0]["ProductComment"].ToString();

              
              lb.Text = "确定";
              lb.CommandName = "save";
              
              
                  
                 
             
              
            }
            else if (e.CommandName == "save")
            {
                filetext.Style.Add("display", "none");
                lb.Text = "编辑";
                lb.CommandName = "edit";
                string text = (!fileupload.HasFile) ? filetext.Text : "ProductImgs/"+fileupload.FileName;
                DataTable dt = newproductview.UpdateProduct(Convert.ToInt32(e.CommandArgument), text, producttitle.Value, productcatagory.Value, productkeyword.Value, productprice.Value, productcomment.Value);
                producttitle.Value = null;
                productkeyword.Value = null;
                productcatagory.Value = null;
                productprice.Value = null;
                productcomment.Value = null;
                main();

            }
            if (e.CommandName == "delete") {
                adproductedit.DataSource = newproductview.deletebyid( Convert.ToInt32(e.CommandArgument));
                adproductedit.DataBind();
                main();
            }
        }

        protected void addbtn_Click(object sender, EventArgs e)
        {
            if (fileupload.FileName != "" || producttitle.Value != "" || productcatagory.Value != "" || productcomment.Value != "" || productprice.Value != "" || productprice.Value != "")
            {
            if (fileupload.HasFile)
            {
                if (fileupload.PostedFile.ContentLength < 10485760)
                {
                    try
                    {
                        fileupload.PostedFile.SaveAs(Server.MapPath("~/ProductImgs/") + fileupload.FileName);
                        label.Text = "上传成功！";
                    }
                    catch (Exception)
                    {
                        label.Text = "上传不成功！";
                    }
                }
                else
                {
                    label.Text = "上传图片不能大于10M";
                }
            }
            else
            {
                label.Text = "请选择上传文件！";
            }


            DataTable dt = newproductview.insert_product("ProductImgs/" + fileupload.FileName, producttitle.Value, productcatagory.Value, productkeyword.Value, productprice.Value, productcomment.Value);
            adproductedit.DataSource = dt;
            adproductedit.DataBind();
            main();
            }


        }
    }
}