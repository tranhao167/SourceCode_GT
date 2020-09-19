using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace Backend.Controllers.Candidates
{
    public class PersonalInfomationController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public PersonalInfomationController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult PutPasword([FromBody] PersonalInfomationDTO cand)
        {
            var info = fsoft_taskDBEntities.Candidates.Where(a => a.CandID == cand.CandID).FirstOrDefault();

            info.CandGender = cand.CandGender;
            info.CandName = cand.CandName;
            info.CandMajor = cand.CandMajor;
            info.CandAddress = cand.CandAddress;
            info.CandBirthday = cand.CandBirthday;
            info.CandPhone = cand.CandPhone;
            info.CandID = cand.CandID;
            info.AccName = cand.AccName;
            info.Email = cand.Email;
            info.AccName = cand.AccName;
            fsoft_taskDBEntities.SaveChanges();
            var pass = fsoft_taskDBEntities.Accounts.Where(p => p.AccName == cand.AccName).FirstOrDefault();
            pass.Password = cand.Password;
            fsoft_taskDBEntities.SaveChanges();
            return Ok();
        }
    }
}
