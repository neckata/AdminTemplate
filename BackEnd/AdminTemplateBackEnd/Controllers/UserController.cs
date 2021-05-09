using System;
using System.Linq;
using System.Threading.Tasks;
using AdminTemplate.Api.Models.Common;
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
    public class UserController : Controller
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
                var item = _query.Get(id);
                var model = _mapper.Map<UserModel>(item);
                return model;
            }

            //[HttpPost]
            //[ValidateModel]
            //public async Task<UserModel> Post([FromBody]CreateUserModel requestModel)
            //{
            //    var item = await _query.Create(requestModel);
            //    var model = _mapper.Map<UserModel>(item);
            //    return model;
            //}

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

            [HttpDelete("{id}")]
            public async Task Delete(int id)
            {
                await _query.Delete(id);
            }
        }
    }
}
