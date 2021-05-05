using System;
using System.Linq;
using System.Threading.Tasks;
using AdminTemplate.Api.Common.Exceptions;
using AdminTemplate.Api.Models.Login;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Access.DAL;
using AdminTemplate.Data.Access.Helpers;
using AdminTemplate.Data.Model;
using AdminTemplate.Queries.Models;
using AdminTemplate.Security;
using AdminTemplate.Security.Auth;
using Microsoft.EntityFrameworkCore;

namespace AdminTemplate.Queries.Queries
{
    public class LoginQuery : ILoginQuery
    {
        private readonly IUnitOfWork _uow;
        private readonly ITokenBuilder _tokenBuilder;
        private readonly IUsersQuery _usersQuery;
        private readonly ISecurityContext _context;
        private Random _random;

        public LoginQuery(IUnitOfWork uow, ITokenBuilder tokenBuilder, IUsersQuery usersQuery, ISecurityContext context)
        {
            _random = new Random();
            _uow = uow;
            _tokenBuilder = tokenBuilder;
            _usersQuery = usersQuery;
            _context = context;
        }

        public UserWithToken Authenticate(string username, string password)
        {
            var user = (from u in _uow.Query<User>()
                        where u.Username == username && !u.IsDeleted
                        select u)
                .Include(x => x.Roles)
                .ThenInclude(x => x.Role)
                .FirstOrDefault();

            if (user == null)
            {
                throw new BadRequestException("username/password aren't right");
            }

            if (string.IsNullOrWhiteSpace(password) || !user.Password.VerifyWithBCrypt(password))
            {
                throw new BadRequestException("username/password aren't right");
            }

            var expiresIn = DateTime.Now + TokenAuthOption.ExpiresSpan;
            var token = _tokenBuilder.Build(user.Username, user.Roles.Select(x => x.Role.Name).ToArray(), expiresIn);

            return new UserWithToken
            {
                ExpiresAt = expiresIn,
                Token = token,
                User = user
            };
        }

        public async Task<User> Register(RegisterModel model)
        {
            var requestModel = new CreateUserModel
            {
                FirstName = model.FirstName,
                LastName = model.LastName,
                Password = model.Password,
                Username = model.Username
            };

            var user = await _usersQuery.Create(requestModel);
            return user;
        }

        public async Task ChangePassword(ChangeUserPasswordModel requestModel)
        {
            await _usersQuery.ChangePassword(_context.User.ID, requestModel);
        }
    }
}
