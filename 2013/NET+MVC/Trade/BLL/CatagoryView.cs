using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
    public class CatagoryView
    {
        private static readonly Catagory newcatagory = new Catagory();
        public DataTable GetAllCatagory() {

            return newcatagory.GetCatagorys();
        }

        public DataTable DeleteCatagorysById(int Id) {
            return newcatagory.DeleteCatagorysById(Id);
        }
        public DataTable UpdateCatagorysById(int Id, string Catagory, string Url) {
            return newcatagory.UpdateCatagorysById(Id, Catagory, Url);
        }
        public DataTable InsertCatagorysById(string Catagory, string Url) {
            return newcatagory.InsertCatagorysById( Catagory, Url);
        }
        public DataTable GetCatagorysById(int Id) {
            return newcatagory.GetCatagorysById(Id);
        }
    }
}
