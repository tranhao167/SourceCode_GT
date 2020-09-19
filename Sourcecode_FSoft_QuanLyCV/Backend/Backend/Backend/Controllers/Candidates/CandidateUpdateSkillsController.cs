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
    public class CandidateUpdateSkillsController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateUpdateSkillsController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult UpdateWE(List<PostSkills> cv)
        {
            using (fsoft_taskDBEntities)
            {

                foreach (PostSkills cvcand in cv)
                {

                    //...............Skill...........................

                    if (cv == null)
                    {
                        return BadRequest("Invalid");
                    }
                    var cvCandID = fsoft_taskDBEntities.Candidates.Where(x => x.CandID == cvcand.CandID).FirstOrDefault();
                    if (cvcand.SkillName == null || cvcand.TypeSkill == null || cvCandID == null)
                    {
                        return BadRequest("Invalid Data");
                    }

                    var insertedskill = new Skill()
                    {
                        CandID = cvcand.CandID,
                        SkillID = cvcand.SkillID,
                        SkillName = cvcand.SkillName,
                        TypeSkill = cvcand.TypeSkill,

                    };
                    fsoft_taskDBEntities.Entry(insertedskill).State = EntityState.Modified;
                    fsoft_taskDBEntities.SaveChanges();


                }
                return Ok(cv);
            }

        }
    }
}
