using Backend.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;

namespace Backend.Controllers
{
    public class Mail_mutiController : ApiController
    {

        //[HttpPost]
        //public IHttpActionResult sendmail(List<Mail_CC> email)
        //{
        //    string to = email.to;
        //    string subject = email.subject;
        //    string body = email.body;
        //    MailMessage mm = new MailMessage();
        //    mm.From = new MailAddress("evannguyen355@gmail.com");
        //    mm.To.Add(to);
        //    mm.Subject = subject;
        //    mm.Body = body;
        //    mm.IsBodyHtml = false;
        //    SmtpClient smtp = new SmtpClient("smtp.gmail.com");
        //    smtp.UseDefaultCredentials = true;
        //    smtp.Port = 587;
        //    smtp.EnableSsl = true;
        //    smtp.Credentials = new System.Net.NetworkCredential("evannguyen355@gmail.com", "Evan160798..");
        //    smtp.Send(mm);
        //    return Ok();

        //}
    }
}
