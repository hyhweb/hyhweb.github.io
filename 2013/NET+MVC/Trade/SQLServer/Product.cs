using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using IDAL;
using Model;
using DBUtility;

namespace SQLServerDAL
{
    public class Product
    {
        private const string select_all_product = "select * from Product order by Id desc";
        private const string select_by_id = "select * from Product where Id=@Id";
        private const string select_by_catagory = "select * from Product where ProductCatagory=@ProductCatagory";
        
        private const string delete_by_id = "delete from Product where Id=@Id";
        private const string insert_product = "insert into Product(ProductUrl,ProductTitle,ProductCatagory,ProductKeyWord,ProductPrice,ProductComment) values(@ProductUrl,@ProductTitle,@ProductCatagory,@ProductKeyWord,@ProductPrice,@ProductComment)";
        private const string update_product = "update Product set ProductUrl=@ProductUrl,ProductTitle=@ProductTitle,ProductCatagory=@ProductCatagory,ProductKeyWord=@ProductKeyWord,ProductPrice=@ProductPrice ,ProductComment=@ProductComment  where Id=@Id ";
        private const string parms_id = "@Id";
        private const string parms_producturl = "@ProductUrl";
        private const string parms_producttitle ="@ProductTitle";
        private const string parms_productkeyword ="@ProductKeyWord";
        private const string parms_productprice ="@ProductPrice";
        private const string parms_productcatagory = "@ProductCatagory";
        private const string parms_productcomment = "@ProductComment";


        //显示全部函数
        public DataTable GetProducts() { 
        
          using( DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,select_all_product,null) ){
              return dt;
          }
        }
        //删除函数
        public DataTable DeleteById(int id) {
            SqlParameter parms = new SqlParameter(parms_id,SqlDbType.Int,50);
            parms.Value = id;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring,CommandType.Text,delete_by_id,parms))
            {
                 return dt;
            }
        }
        //插入函数
        public DataTable InsertProduct(string ProductUrl, string ProductTitle, string ProductCatagory, string ProductKeyWord, string ProductPrice, string ProductComment)
        {

            SqlParameter[] parms = new SqlParameter[]{
                new SqlParameter(parms_producturl,SqlDbType.VarChar,50),
                new SqlParameter(parms_producttitle,SqlDbType.VarChar,50),
                new SqlParameter(parms_productcatagory,SqlDbType.VarChar,50),
                new SqlParameter(parms_productkeyword,SqlDbType.VarChar,50),
                new SqlParameter(parms_productprice,SqlDbType.VarChar,50),
                new SqlParameter(parms_productcomment,SqlDbType.VarChar,1000)
            };
            parms[0].Value = ProductUrl;
            parms[1].Value = ProductTitle;
            parms[2].Value = ProductKeyWord;
            parms[3].Value = ProductPrice;
            parms[4].Value = ProductCatagory;
            parms[5].Value = ProductComment;

            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, insert_product,parms))
            {
                return dt;
            }
        }
        //显示一条数据函数
        public DataTable SelectById(int id)
        {
            SqlParameter parms = new SqlParameter(parms_id, SqlDbType.Int, 50);
            parms.Value = id;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text,select_by_id, parms))
            {
                return dt;
            }
        }
        //更新数据
        public DataTable UpdateById(int Id, string ProductUrl, string ProductTitle, string ProductCatagory, string ProductKeyWord, string ProductPrice, string ProductComment)
        {
            SqlParameter[] parms = new SqlParameter[]{
                new SqlParameter(parms_id,SqlDbType.Int,50),
                new SqlParameter(parms_producturl,SqlDbType.VarChar,50),
                new SqlParameter(parms_producttitle,SqlDbType.VarChar,50),
                new SqlParameter(parms_productcatagory,SqlDbType.VarChar,50),
                new SqlParameter(parms_productkeyword,SqlDbType.VarChar,50),
                new SqlParameter(parms_productprice,SqlDbType.VarChar,50),
                new SqlParameter(parms_productcomment,SqlDbType.VarChar,1000)
            };
            parms[0].Value = Id;
            parms[1].Value = ProductUrl;
            parms[2].Value = ProductTitle;
            parms[3].Value = ProductCatagory;
            parms[4].Value = ProductKeyWord;
            parms[5].Value = ProductPrice;
            parms[6].Value = ProductComment;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, update_product, parms))
            {
                return dt;
            }
        }

        public DataTable SelectByCatagory(string catagory)
        {
            SqlParameter parms = new SqlParameter(parms_productcatagory, SqlDbType.Char, 50);
            parms.Value = catagory;
            using (DataTable dt = SqlHelper.ExcuteDataTable(SqlHelper.connectionstring, CommandType.Text, select_by_catagory, parms))
            {
                return dt;
            }
        }

    }
}
