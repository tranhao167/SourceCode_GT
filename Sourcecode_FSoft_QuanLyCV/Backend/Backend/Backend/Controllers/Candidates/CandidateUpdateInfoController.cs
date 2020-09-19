using Backend.Models.EFModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers.Candidates
{
    public class CandidateUpdateInfoController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CandidateUpdateInfoController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpPost]
        public IHttpActionResult Update(int id, string objective, string interest)
        {
            using (fsoft_taskDBEntities)
            {



                //...............Edu...........................


                var cvCandID = fsoft_taskDBEntities.Candidates.Where(x => x.CandID == id).FirstOrDefault();

                if (cvCandID != null)
                {
                    cvCandID.CandID = id;
                    cvCandID.Objective = objective;
                    cvCandID.Interest = interest;
                    cvCandID.UpdateNew = DateTime.Now;
                    cvCandID.UpdateTimes = cvCandID.UpdateTimes + 1;
                    cvCandID.HasRejected = null;
                    fsoft_taskDBEntities.SaveChanges();
                }
                else
                {
                    return BadRequest("Invalid Data");
                }
                return Ok();
            }

        }
    }
}
