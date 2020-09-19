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
    public class CandidateEducationController : ApiController
    {   
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateEducationController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult PostNewCV([FromBody] List<PostMulti> cv)
        {
            using (fsoft_taskDBEntities)
            {

                foreach (PostMulti cvcand in cv)
                {

                    //...............Education...........................

                    if (cv == null)
                    {
                        return BadRequest("Invalid");
                    }
                    var insertededu = fsoft_taskDBEntities.Educations.Add(new Education()
                    {
                        CandID = cvcand.CandID,
                        Startday = cvcand.Startday,
                        Endday = cvcand.Endday,
                        Major = cvcand.Major,
                        School = cvcand.School,
                        GPA = cvcand.GPA,
                        LevelEdu = cvcand.LevelEdu,
                    });
                    if (insertededu != null)
                    {
                        fsoft_taskDBEntities.Entry(insertededu).State = EntityState.Added;
                        fsoft_taskDBEntities.SaveChanges();
                        
                    }
                    else
                        return BadRequest("Invalid");

                }
            }
            return Ok(cv);
        }
    }
}
