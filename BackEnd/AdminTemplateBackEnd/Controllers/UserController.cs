using System;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Access.Constants;
using AdminTemplate.Data.Model;
using AdminTemplate.Filters;
using AdminTemplate.Maps;
using AdminTemplate.Queries.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminTemplate.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = Roles.AdministratorOrManager)]
    public class UsersController : Controller
    {
        private readonly IUsersQuery _query;
        private readonly IAutoMapper _mapper;

        public UsersController(IUsersQuery query, IAutoMapper mapper)
        {
            _query = query;
            _mapper = mapper;
        }

        [HttpGet]
        [QueryableResult]
        public IQueryable<UserModel> Get()
        {
            var result = _query.Get();
            var models = _mapper.Map<User, UserModel>(result);
            return models;
        }

        [HttpGet("{id}")]
        public UserModel Get(int id)
        {
            var user = _query.Get(id);
            var model = _mapper.Map<UserModel>(user);
            return model;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<UserModel> Post([FromBody] CreateUserModel requestModel)
        {
            var item = await _query.Create(requestModel);
            var model = _mapper.Map<UserModel>(item);
            return model;
        }

        [HttpPost("{id}/password")]
        [ValidateModel]
        public async Task ChangePassword(int id, [FromBody] ChangeUserPasswordModel requestModel)
        {
            await _query.ChangePassword(id, requestModel);
        }

        [HttpPut("{id}")]
        [ValidateModel]
        public async Task<UserModel> Put(int id, [FromBody] UpdateUserModel requestModel)
        {
            var item = await _query.Update(id, requestModel);
            var model = _mapper.Map<UserModel>(item);
            return model;
        }

        [HttpPost("upload")]
        [DisableRequestSizeLimit]
        //https://code-maze.com/upload-files-dot-net-core-angular/
        public IActionResult Upload()
        {
            try
            {
                var file = Request.Form.Files[0];
                var folderName = Path.Combine("Resources", "Images");
                var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);
                if (file.Length > 0)
                {
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    var fullPath = Path.Combine(pathToSave, fileName);
                    var dbPath = Path.Combine(folderName, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    return Ok(new { dbPath });
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _query.Delete(id);
        }
    }
}
