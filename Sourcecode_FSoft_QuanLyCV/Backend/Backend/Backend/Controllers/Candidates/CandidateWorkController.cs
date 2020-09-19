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
    public class CandidateWorkController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateWorkController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        public IHttpActionResult PostNewCV([FromBody] List<PostWorkExperience> cv)
        {
            using (fsoft_taskDBEntities)
            {

                foreach (PostWorkExperience cvcand in cv)
                {

                    //...............Work...........................

                    if (cv == null)
                    {
                        return BadRequest("Invalid");
                    }
                    var insertedwork = fsoft_taskDBEntities.WorkExperiences.Add(new WorkExperience()
                    {
                        WorkPlace = cvcand.WorkPlace,
                        WorkTime = cvcand.WorkTime,
                        Position = cvcand.Position,
                        CandID = cvcand.CandID
                    });
                    if (insertedwork != null)
                    {
                        fsoft_taskDBEntities.Entry(insertedwork).State = EntityState.Added;
                        fsoft_taskDBEntities.SaveChanges();
                    } else return BadRequest("Invalid");


                }
            }
            return Ok(cv);
        }
    }
}
