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
    public class CandidateSkillsController : ApiController
    {

        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateSkillsController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        public IHttpActionResult PostNewCV([FromBody] List<PostSkills> cv)
        {
            using (fsoft_taskDBEntities)
            {

                foreach (PostSkills cvcand in cv)
                {

                    //...............Work...........................

                    if (cv == null)
                    {
                        return BadRequest("Invalid");
                    }
                    var cvCandID = fsoft_taskDBEntities.Candidates.Where(x => x.CandID == cvcand.CandID).FirstOrDefault();
                    if (cvcand.TypeSkill == null || cvcand.SkillName == null || cvCandID == null)
                    {
                        return BadRequest("Invalid Data");
                    }
                    var insertedskill = fsoft_taskDBEntities.Skills.Add(new Skill()
                    {
                        TypeSkill = cvcand.TypeSkill,
                        SkillName = cvcand.SkillName,
                        CandID = cvcand.CandID
                    });
                    if (insertedskill != null)
                    {
                        fsoft_taskDBEntities.Entry(insertedskill).State = EntityState.Added;
                        fsoft_taskDBEntities.SaveChanges();
                    }
                    else return BadRequest("Invalid");
                    
                }
                
            }
            return Ok(cv);
        }
    }
}
