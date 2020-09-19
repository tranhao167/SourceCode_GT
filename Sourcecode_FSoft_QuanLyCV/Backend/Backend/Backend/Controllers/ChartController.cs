using Backend.Models;
using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Backend.Controllers
{
    public class ChartController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public ChartController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        public IHttpActionResult GetChart([FromUri]PagingParameterModel pagingParameterModel)
        {
            //NewEmployer
            IList<EmployerDTO> employerDTOs = new List<EmployerDTO>();
            var employerDTOS = fsoft_taskDBEntities.Employers.Include("Account").Where(x => x.HasDeleted == null)
                            .Select(p => new EmployerDTO()
                            {
                                EmpID = p.EmpID,
                                EmpName = p.EmpName,
                                AccName = p.AccName,
                                EmpEmail = p.EmpEmail,
                                EmpPhone = p.EmpPhone,
                                Password = p.Account.Password

                            }).ToList();
            // Get's No of Rows Count   
            int countNewEmp = employerDTOS.Count();
            int TotalCountNewEmp = countNewEmp;
            //DeletedEmployer
            IList<EmployerDTO> employerDTOsdel = new List<EmployerDTO>();
            var employerDTOSdel = fsoft_taskDBEntities.Employers.Include("Account").Where(x => x.HasDeleted != null)
                           .Select(p => new EmployerDTO()
                           {
                               EmpID = p.EmpID,
                               EmpName = p.EmpName,
                               AccName = p.AccName,
                               EmpEmail = p.EmpEmail,
                               EmpPhone = p.EmpPhone,
                               Password = p.Account.Password

                           }).ToList();
            // Get's No of Rows Count   
            int countDelEmp = employerDTOSdel.Count();
            int TotalCountDelEmp = countDelEmp;
            //Approved CV
            IList<ListCV> listcvDTOs = new List<ListCV>();
            var listcvDTOS = fsoft_taskDBEntities.Candidates.Where(x => x.Status == "Approved")
                           .Select(p => new ListCV()
                           {
                               CandID = p.CandID,
                               CandName = p.CandName,
                               CandMajor = p.CandMajor,
                               Startday = p.Startday.ToString()

                           }).ToList();
            // Get's No of Rows Count   
            int countAppr = listcvDTOS.Count();
            int TotalCountAppr = countAppr;
            // Return List of CVDeleted
            IList<ListCV> listCVs = new List<ListCV>();
            var listCVS = fsoft_taskDBEntities.Candidates.Where(x => x.HasDeleted != null)
                           .Select(p => new ListCV()
                           {
                               CandID = p.CandID

                           }).ToList();
            // Get's No of Rows Count  CVDeleted  
            int countdel = listCVS.Count();
            int TotalCountdel = countdel;
            //Return List of Accepted
            IList<ListCV> listCVsAccept = new List<ListCV>();
            var listCVSAccept = fsoft_taskDBEntities.Candidates.Where(x => x.Status == "Accepted")
                           .Select(p => new ListCV()
                           {
                               CandID = p.CandID

                           }).ToList();
            // Get's No of Rows Count  CVDeleted  
            int countAccept = listCVSAccept.Count();
            int TotalCountAccept = countdel;
            //
            var paginationMetadata = new
            {
                TotalCountNewEmp = TotalCountNewEmp,
                TotalCountDelEmp = TotalCountDelEmp,
                TotalCountAppr = TotalCountAppr,
                TotalCountdel = TotalCountdel,
                TotalCountAccept=TotalCountAccept
            };
            return Json(new { paginationMetadata });
        }
    }
}
