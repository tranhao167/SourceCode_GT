using Backend.Models;
using Backend.Models.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers.CV
{
    public class DeleteMultiCandController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public DeleteMultiCandController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }

        [HttpPut]
        public IHttpActionResult DeleteCustomers([FromBody] List<DelmultiCV> data)
        {
            if (data == null)
            {
                return BadRequest("Invalid");
            }
            using (fsoft_taskDBEntities)
            {
                foreach (DelmultiCV candID in data)
                {

                    Candidate candidate = fsoft_taskDBEntities.Candidates.Where(c => c.CandID == candID.CandID).FirstOrDefault();
                    candidate.HasDeleted = DateTime.Now;
                    candidate.Startday = null;
                    fsoft_taskDBEntities.SaveChanges();

                    var education = fsoft_taskDBEntities.Educations.Where(e => e.CandID == candID.CandID).ToArray();
                    if (education == null)
                    {
                        return BadRequest("Education invalid");
                    }
                    foreach (Education edu in education)
                    {
                        edu.HasDeleted = DateTime.Now;
                    }
                    fsoft_taskDBEntities.SaveChanges();

                    var skill = fsoft_taskDBEntities.Skills.Where(s => s.CandID == candID.CandID).ToArray();
                    if (skill == null)
                    {
                        return BadRequest("Skill invalid");
                    }
                    foreach (Skill skills in skill)
                    {
                        skills.HasDeleted = DateTime.Now;
                    }
                    fsoft_taskDBEntities.SaveChanges();

                    var workExp = fsoft_taskDBEntities.WorkExperiences.Where(w => w.CandID == candID.CandID).ToArray();
                    if (workExp == null)
                    {
                        return BadRequest("Work Experience invalid");
                    }
                    foreach (WorkExperience wExp in workExp)
                    {
                        wExp.HasDeleted = DateTime.Now;
                    }
                    fsoft_taskDBEntities.SaveChanges();

                }
            }
            return Ok();
        }
    }
}
