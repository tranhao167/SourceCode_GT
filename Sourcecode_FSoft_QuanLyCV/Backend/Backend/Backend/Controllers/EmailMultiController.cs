using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Net.Mail;
using Backend.Models;
using Backend.Models.EFModel;
using DTO;

namespace Backend.Controllers
{
    public class EmailMultiController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public EmailMultiController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult sendmail(List<Email> email)
        {
           
            foreach (Email em in email)
            {
                MailMessage mm = new MailMessage();
                mm.From = new MailAddress("evannguyen355@gmail.com");
                mm.To.Add(em.to);
                mm.Subject = em.subject;
                mm.Body = em.body;
                mm.IsBodyHtml = false;
                SmtpClient smtp = new SmtpClient("smtp.gmail.com");
                smtp.UseDefaultCredentials = true;
                smtp.Port = 587;
                smtp.EnableSsl = true;
                smtp.Credentials = new System.Net.NetworkCredential("evannguyen355@gmail.com", "Evan160798..");
                smtp.Send(mm);
                var CanEmail = fsoft_taskDBEntities.Candidates.Where(x => x.Email == em.to).ToArray();
                if (CanEmail == null)
                {
                    return BadRequest("Education invalid");
                }
                foreach (Candidate cand in CanEmail)
                {
                    if (cand.Status == null)
                    {
                        cand.Status = "Approved";
                    }
                    else if (cand.Status == "Approved")
                    {
                        cand.Status = "Accepted";

                    }
                }
                fsoft_taskDBEntities.SaveChanges();
            }


            return Ok();


        }
    }
}
