using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
     public class ProductView
    {
         private static readonly Product newproduct = new Product();

         public DataTable GetAllProducts() {
             return newproduct.GetProducts();
         }
         public DataTable deletebyid(int id) {
            return  newproduct.DeleteById(id);
         }
         public DataTable insert_product(string ProductUrl, string ProductTitle, string ProductCatagory, string ProductKeyWord, string ProductPrice, string ProductComment)
         {
             return newproduct.InsertProduct(ProductUrl, ProductTitle, ProductCatagory, ProductKeyWord, ProductPrice, ProductComment);
         }
         public DataTable GetProductById(int id) {
             return newproduct.SelectById(id);
         }
         public DataTable UpdateProduct(int Id, string ProductUrl, string ProductTitle, string ProductCatagory, string ProductKeyWord, string ProductPrice, string ProductComment)
         {
             return newproduct.UpdateById(Id, ProductUrl, ProductTitle, ProductCatagory, ProductKeyWord, ProductPrice, ProductComment);
         }
         public DataTable SelectByCatagory(string catagory) {
             return newproduct.SelectByCatagory(catagory);
         }

    }
}
