using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Backend.Models;
using Backend.Models.EFModel;
using DTO;

namespace Backend.Controllers.Employers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class EmpSearchController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public EmpSearchController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }

        public IHttpActionResult GetNewEmployer([FromUri]PagingParameterModel pagingParameterModel)
        {
            // Return List of Customer  
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
            //Search Parameter [With null check]  
            // ------------------------------------ Search Parameter-------------------   

            if (!string.IsNullOrEmpty(pagingParameterModel.QuerySearch))
            {
                employerDTOS = employerDTOS.Where(a => a.EmpName.ToLower().Contains(pagingParameterModel.QuerySearch.ToLower())).ToList();
            }

            // ------------------------------------ Search Parameter-------------------  

            // Get's No of Rows Count   
            int count = employerDTOS.Count();

            // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
            int CurrentPage = pagingParameterModel.pageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            int PageSize = pagingParameterModel.pageSize;

            // Display TotalCount to Records to User  
            int TotalCount = count;

            // Calculating Totalpage by Dividing (No of Records / Pagesize)  
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // Returns List of Customer after applying Paging   
            var items = employerDTOS.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

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
    }
}
