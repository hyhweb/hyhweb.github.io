using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data;
using Model;
using SQLServerDAL;

namespace BLL
{
    public class MessageView
    {
        private static readonly Message newmessage = new Message();

        public DataTable GetAllMessages() {

            return newmessage.GetMessages();
        }
        public DataTable DeleteMessageById(int id) {
            return  newmessage.DeleteMessage(id);
        }
        public DataTable GetMessageByPerson(string person)
        {
            return newmessage.GetMessageByPerson(person);
        }
        public DataTable AddMessage(string MessageTitle, string MessageText, string CompanyName, string Country, string ContactPerson, string Phone, string Email)
        {
            return newmessage.InsertMesages(MessageTitle, MessageText, CompanyName, Country, ContactPerson, Phone, Email);
        }
    }
}
