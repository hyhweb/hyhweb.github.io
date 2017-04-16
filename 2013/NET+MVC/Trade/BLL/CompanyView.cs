using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
    public  class CompanyView
    {
        private static Company companyview = new Company();
        public DataTable GetCompany() {
            return companyview.GetCompany();
        }
        public DataTable SelectCompanyById(int id)
        {
            return companyview.SelectCompanyById(id);
        }
        public DataTable UpdateCompany(int Id, string Company, string Address, string City, string Telephone, string Mobilephone, string Fax, string Email)
        {
            return companyview.UpdateCompany(Id, Company, Address, City, Telephone, Mobilephone, Fax, Email);
        }
    }
}
