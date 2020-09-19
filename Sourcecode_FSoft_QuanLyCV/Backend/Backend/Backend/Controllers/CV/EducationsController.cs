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
    public class EducationsController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public EducationsController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        public IHttpActionResult getEducationbyCandID(int id)
        {
            EducationDTO educationDTO = null;

            educationDTO = fsoft_taskDBEntities.Educations.Include("Candidate")
                .Where(p => p.Candidate.CandID == id)
                .Select(p => new EducationDTO()
                {
                    
                    EduID = p.EduID,
                    Major = p.Major,
                    School = p.School,
                    LevelEdu = p.LevelEdu,
                    Startday = p.Startday.ToString(),
                    Endday = p.Endday.ToString(),
                    GPA = p.GPA.ToString(),
                    CandID=p.CandID
                }).FirstOrDefault<EducationDTO>();

            if (educationDTO == null)
            {
                return NotFound();
            }
            return Json(educationDTO);
        }
    }
}
