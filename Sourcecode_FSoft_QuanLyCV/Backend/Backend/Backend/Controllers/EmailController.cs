using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace Backend.Controllers
{
    public class EmailController : ApiController
    {
        [HttpPost]
        public IHttpActionResult sendmail(EmailDTO email)
        {
            
                MailMessage mm = new MailMessage();
                mm.From = new MailAddress("evannguyen355@gmail.com");
                mm.To.Add(email.to);
                mm.Subject = email.subject;
                mm.Body = email.body;
                mm.IsBodyHtml = false;
                SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                smtp.UseDefaultCredentials = true;
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.Credentials = new System.Net.NetworkCredential("evannguyen355@gmail.com", "Evan160798..");
                smtp.Send(mm);

            return Ok();


        }
    }
}
