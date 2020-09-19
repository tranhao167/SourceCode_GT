using Backend.Models;
using Backend.Models.EFModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Backend.Controllers.Employers
{
    public class DeleteMultiEmpController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public DeleteMultiEmpController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }

        [HttpPut]
        public IHttpActionResult DeleteCustomers([FromBody] List<Deletemulti> data)
        {
            List<Employer> returnEmployer = new List<Employer>();
            using (fsoft_taskDBEntities)
            {
                
                foreach (Deletemulti empID in data)
                {
                    Employer employer = fsoft_taskDBEntities.Employers.Where(x => x.EmpID == empID.EmpID).FirstOrDefault();
                    employer.HasDeleted = DateTime.Now;
                    fsoft_taskDBEntities.SaveChanges();
                    Account account = fsoft_taskDBEntities.Accounts.Where(a => a.AccName == employer.AccName).FirstOrDefault(); 
                    account.HasDeleted = DateTime.Now;
                    returnEmployer.Add(employer);
                    fsoft_taskDBEntities.SaveChanges();
                }

            }
            return Ok();
        }
    }
}
