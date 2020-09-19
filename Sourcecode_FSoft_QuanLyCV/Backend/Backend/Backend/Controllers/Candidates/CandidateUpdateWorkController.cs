using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers.Candidates
{
    public class CandidateUpdateWorkController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateUpdateWorkController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult UpdateWE(List<PostWorkExperience> cv)
        {
            using (fsoft_taskDBEntities)
            {

                foreach (PostWorkExperience cvcand in cv)
                {

                    //...............WE...........................

                    if (cv == null)
                    {
                        return BadRequest("Invalid");
                    }
                    var cvCandID = fsoft_taskDBEntities.Candidates.Where(x => x.CandID == cvcand.CandID).FirstOrDefault();
                    if (cvcand.WorkTime == null || cvcand.WorkPlace == null || cvcand.Position == null || cvCandID == null)
                    {
                        return BadRequest("Invalid Data");
                    }
                    var insertedwe = new WorkExperience()
                    {
                        CandID = cvcand.CandID,
                        ExpID = cvcand.ExpID,
                        WorkPlace = cvcand.WorkPlace,
                        WorkTime = cvcand.WorkTime,
                        Position = cvcand.Position,

                    };
                    fsoft_taskDBEntities.Entry(insertedwe).State = EntityState.Modified;
                    fsoft_taskDBEntities.SaveChanges();


                }
                return Ok(cv);
            }

        }
    }
}
