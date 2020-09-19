using Backend.Models;
using Backend.Models.EFModel;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Backend.Controllers.CV
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class CVApprovedController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CVApprovedController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpGet]
        public IHttpActionResult GetApprovedCV([FromUri]PagingParameterModel pagingParameterModel)
        {
            // Return List of Customer  
            IList<ListCV> listcvDTOs = new List<ListCV>();
            var listcvDTOS = fsoft_taskDBEntities.Candidates.Where(x => x.Status == "Approved" && x.Startday!=null)
                           .Select(p => new ListCV()
                           {
                               CandID = p.CandID,
                               CandName = p.CandName,
                               CandMajor = p.CandMajor,
                               Startday = p.Startday.ToString(),
                               Email = p.Email

                           }).ToList();
            // Get's No of Rows Count   
            int count = listcvDTOS.Count();

            // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
            int CurrentPage = pagingParameterModel.pageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            int PageSize = pagingParameterModel.pageSize;

            // Display TotalCount to Records to User  
            int TotalCount = count;

            // Calculating Totalpage by Dividing (No of Records / Pagesize)  
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // Returns List of Customer after applying Paging   
            var items = listcvDTOS.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

            // if CurrentPage is greater than 1 means it has previousPage  
            var previousPage = CurrentPage > 1 ? "Yes" : "No";

            // if TotalPages is greater than CurrentPage means it has nextPage  
            var nextPage = CurrentPage < TotalPages ? "Yes" : "No";

            // Object which we are going to send in header   
            var paginationMetadata = new
            {
                totalCount = TotalCount,
                pageSize = PageSize,
                currentPage = CurrentPage,
                totalPages = TotalPages,
                previousPage,
                nextPage,
                data = items
            };

            // Setting Header  
            //HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
            // Returing List of Customers Collections  
            //return items;
            return Json(new { paginationMetadata });
        }
        //Send mail ACCEPTED and change status
        [HttpPut]
        public IHttpActionResult Changestatus(ChangeSta_sendmailDTO changeSta_SendmailDTO)
        {
            var changed = fsoft_taskDBEntities.Candidates.Where(x => x.Email == changeSta_SendmailDTO.Email).FirstOrDefault();
            changed.Status = "Accepted";
            fsoft_taskDBEntities.SaveChanges();
            return Ok();
        }
    }
}
