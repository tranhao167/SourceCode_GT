using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Backend.Controllers.Candidates
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CandidateInfoController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateInfoController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpGet]
        public IHttpActionResult getAcc(string acc)
        {
            var info = fsoft_taskDBEntities.Accounts.Where(a => a.AccName == acc).FirstOrDefault();
            if (info != null)
            {
                var account = new
                {
                    AccName = acc,
                    Pass=info.Password
                };
                return Json(account);
            }
            return BadRequest("Invalid");
        }
        [HttpPost]
        public IHttpActionResult PostNewCV([FromBody] CVDTO cv)
        {
            //.............Info..........................
            if (cv == null)
            {
                return BadRequest("Invalid");
            }
            var inserted = new Candidate()
            {
                Objective = cv.Objective,
                Interest = cv.Interest,
                Startday = DateTime.Now,
                CandName = cv.CandName,
                CandAddress = cv.CandAddress,
                Email = cv.Email,
                CandPhone = cv.CandPhone,
                Image = cv.Image,
                CandID = cv.CandID,
                CandMajor = cv.CandMajor,
                CandBirthday = cv.CandBirthday,
                CandGender = cv.CandGender,
                AccName = cv.AccName,
                UpdateTimes = 0
            };
            fsoft_taskDBEntities.Entry(inserted).State = EntityState.Modified;
            fsoft_taskDBEntities.SaveChanges();


            return Ok(cv);
        }
    }
}
