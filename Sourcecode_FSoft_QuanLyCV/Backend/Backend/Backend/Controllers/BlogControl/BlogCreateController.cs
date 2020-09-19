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

namespace Backend.Controllers.BlogControl
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class BlogCreateController : ApiController
    {
        Fsoft_TaskDBEntities fsoft_taskDBEntities;
        public BlogCreateController()
        {
            fsoft_taskDBEntities = new Fsoft_TaskDBEntities();
        }
        [HttpGet]
        public IHttpActionResult GetAll([FromUri]PagingParameterModel pagingParameterModel)
        {
            // Return List of Customer  
            IList<BlogDTO> blogDTOs = new List<BlogDTO>();
            var blogDTOS = fsoft_taskDBEntities.Blogs.Where(x=>x.HasDeleted==null)
                           .Select(p => new BlogDTO()
                           {
                               BlogID = p.BlogID,
                               AdminID = p.AdminID,
                               ImageMain = p.ImageMain,
                               Subject = p.Subject,
                               ContentBlog = p.ContentBlog,
                               Description = p.Description,
                               Status = p.Status,
                               Created = p.Created.ToString(),
                               CreatedBy = p.CreatedBy,
                               Modified = p.Modified.ToString(),
                               ModifiedBy = p.ModifiedBy,
                               HasDeleted = p.HasDeleted.ToString()

                           }).ToList();
            //Search Parameter [With null check]  
            // ------------------------------------ Search Parameter-------------------   

            if (!string.IsNullOrEmpty(pagingParameterModel.QuerySearch))
            {
                blogDTOS = blogDTOS.Where(a => a.Subject.ToLower().Contains(pagingParameterModel.QuerySearch.ToLower())).ToList();
            }

            // ------------------------------------ Search Parameter-------------------  
            // Get's No of Rows Count   
            int count = blogDTOS.Count();

            // Parameter is passed from Query string if it is null then it default Value will be pageNumber:1  
            int CurrentPage = pagingParameterModel.pageNumber;

            // Parameter is passed from Query string if it is null then it default Value will be pageSize:20  
            int PageSize = pagingParameterModel.pageSize;

            // Display TotalCount to Records to User  
            int TotalCount = count;

            // Calculating Totalpage by Dividing (No of Records / Pagesize)  
            int TotalPages = (int)Math.Ceiling(count / (double)PageSize);

            // Returns List of Customer after applying Paging   
            var items = blogDTOS.Skip((CurrentPage - 1) * PageSize).Take(PageSize).ToList();

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
        [HttpPut]
        public IHttpActionResult delDetail(int id)
        {
            var findid = fsoft_taskDBEntities.Blogs.FirstOrDefault(a => a.BlogID == id);
            if (findid != null)
            {
                findid.HasDeleted = DateTime.Now;
                fsoft_taskDBEntities.SaveChanges();
                return Ok();
            }
            else return BadRequest();
        }
    }
}
