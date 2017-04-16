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
using Trade;

namespace Trade.Controls
{
    public partial class FileUpload : System.Web.UI.UserControl
    {
        protected void Page_Load(object sender, EventArgs e)
        {
           
        }

        protected void uploadbtn_Click(object sender, EventArgs e)
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
            
         
        }
       


    }
}