using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers.CV
{
    public class WorkExperienceController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public WorkExperienceController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        public IHttpActionResult getWorkExpByCandID(int id)
        {
            WorkExperienceDTO workExperienceDTO = null;

            workExperienceDTO = fsoft_taskDBEntities.WorkExperiences.Include("Candidate")
                .Where(p => p.Candidate.CandID == id)
                .Select(p => new WorkExperienceDTO()
                {
                    ExpID=p.ExpID,
                    Position=p.Position,
                    WorkPlace=p.WorkPlace,
                    WorkTime=p.WorkTime,
                    CandID = p.CandID
                }).FirstOrDefault<WorkExperienceDTO>();

            if (workExperienceDTO == null)
            {
                return NotFound();
            }
            return Json(workExperienceDTO);
        }
    }
}
