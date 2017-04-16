using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;

namespace IDAL
{
    public  interface ICompany
    {
        DataTable GetCompany();
        DataTable SelectCompanyById(int id);
        DataTable UpdateCompany(int Id, string Company, string Address, string City, string Telephone, string Mobilephone, string Fax, string Email);
       // DataTable SelectCompanyById();
       // DataTable UpdateCompany();
    }
}
