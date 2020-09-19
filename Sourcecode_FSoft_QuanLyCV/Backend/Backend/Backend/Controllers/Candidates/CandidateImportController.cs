using Backend.Models.EFModel;
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
    public class CandidateImportController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateImportController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult PostImportCV([FromBody] Candidate cand)
        {
            var insertedimp = new Candidate()
            {
                CandID = cand.CandID,
                CandName = cand.CandName,
                CandPhone = cand.CandPhone,
                Email = cand.Email,
                CandGender = cand.CandGender,
                CandAddress = cand.CandAddress,
                CandBirthday = cand.CandBirthday,
                CandMajor = cand.CandMajor,
                Image = cand.Image,
                AccName = cand.AccName,
                Link = cand.Link,
                UpdateTimes = 0,
                Startday = DateTime.Now
            };
            if (insertedimp != null)
            {
                fsoft_taskDBEntities.Entry(insertedimp).State = EntityState.Modified;
                fsoft_taskDBEntities.SaveChanges();
                return Ok(cand);
            }
            return BadRequest("invalid");

        }
        [HttpPut]
        public IHttpActionResult PutInfo(int id, string link,int times)
        {
            if (link == null)
            {
                return BadRequest("Invalid");
            }
            else
            {
                var cand = fsoft_taskDBEntities.Candidates.Where(x => x.CandID == id).FirstOrDefault();
                if (cand == null)
                {
                    return BadRequest("Invalid");
                }
                else
                {
                    cand.CandID = id;
                    cand.Link = link;
                    cand.UpdateTimes = times+1;
                    cand.HasRejected = null;
                    cand.UpdateNew = DateTime.Now;
                    fsoft_taskDBEntities.SaveChanges();
                    return Ok(link);
                }
            }


        }
    }
}
