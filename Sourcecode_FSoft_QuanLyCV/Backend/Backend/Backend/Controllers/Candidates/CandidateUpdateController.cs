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
    public class CandidateUpdateController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateUpdateController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult UpdateEdu([FromBody] List<PostMulti> cv)
        {
            using (fsoft_taskDBEntities)
            {

                foreach (PostMulti cvcand in cv)
                {

                    //...............Edu...........................

                    if (cv == null)
                    {
                        return BadRequest("Invalid");
                    }
                    var cvCandID = fsoft_taskDBEntities.Candidates.Where(x => x.CandID == cvcand.CandID).FirstOrDefault();
                    if (cvcand.Startday == null || cvcand.Endday == null || cvcand.GPA <= 0 || cvcand.School == null || cvcand.Major == null || cvcand.LevelEdu == null || cvCandID == null)
                    {
                        return BadRequest("Invalid Data");
                    }

                    // if (fsoft_taskDBEntities.Educations.Where(x => x.CandID == cvcand.CandID) != null) {
                    var insertededu = new Education()
                    {
                        CandID = cvcand.CandID,
                        Startday = cvcand.Startday,
                        Endday = cvcand.Endday,
                        Major = cvcand.Major,
                        School = cvcand.School,
                        GPA = Math.Round(cvcand.GPA,1),
                        LevelEdu = cvcand.LevelEdu,
                        EduID = cvcand.EduID,
                    };
                    fsoft_taskDBEntities.Entry(insertededu).State = EntityState.Modified;
                    fsoft_taskDBEntities.SaveChanges();
                    //  }

                    //if (insertededu != null)
                    //{

                    //}
                    //else return BadRequest("Invalid");

                }
                return Ok(cv);
            }
        }
    }
}
