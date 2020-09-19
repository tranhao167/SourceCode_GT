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
    public class CVController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public CVController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }

        public IHttpActionResult GetCV([FromUri]PagingParameterModel pagingParameterModel)
        {
            // Return List of Customer  
            IList<ListCV> listCVs = new List<ListCV>();
            var listCVS = fsoft_taskDBEntities.Candidates.Where(x=>x.HasDeleted==null && x.Startday!=null)
                           .Select(p => new ListCV()
                           {
                               CandID = p.CandID,
                               CandName = p.CandName,
                               CandMajor = p.CandMajor,
                               Startday = p.Startday.ToString(),
                               Email=p.Email

                           }).ToList();
            //Search Parameter [With null check]  
            // ------------------------------------ Search Parameter-------------------   

            if (!string.IsNullOrEmpty(pagingParameterModel.QuerySearch))
            {
                listCVS = listCVS.Where(a => a.CandName.ToLower().Contains(pagingParameterModel.QuerySearch.ToLower())).ToList();
            }

            // ------------------------------------ Search Parameter-------------------  
            // Get's No of Rows Count   
            int count = listCVS.Count();

            // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
            int CurrentPage = pagingParameterModel.pageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            int PageSize = pagingParameterModel.pageSize;

            // Display TotalCount to Records to User  
            int TotalCount = count;

            // Calculating Totalpage by Dividing (No of Records / Pagesize)  
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // Returns List of Customer after applying Paging   
            var items = listCVS.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

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
                QuerySearch = string.IsNullOrEmpty(pagingParameterModel.QuerySearch) ?
                      "No Parameter Passed" : pagingParameterModel.QuerySearch,
                data = items
            };

            // Setting Header  
            //HttpContext.Current.Response.Headers.Add("Paging-Headers", JsonConvert.SerializeObject(paginationMetadata));
            // Returing List of Customers Collections  
            //return items;
            return Json(new { paginationMetadata });
        }
        //Send mail REJECT and change status
        [HttpPut]
        public IHttpActionResult Changestatus(ChangeSta_sendmailDTO changeSta_SendmailDTO)
        {
            var changed = fsoft_taskDBEntities.Candidates.Where(x => x.Email == changeSta_SendmailDTO.Email).FirstOrDefault();
            changed.Status = "Rejected";
            changed.ReReason = changeSta_SendmailDTO.ReReason;
            changed.HasRejected = "Yes";
            fsoft_taskDBEntities.SaveChanges();
            return Ok();
        }
    }
}
