using System.Linq;
using System.Threading.Tasks;
using AdminTemplate.Api.Common.Exceptions;
using AdminTemplate.Api.Models.Common;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Access.DAL;
using AdminTemplate.Data.Access.Helpers;
using AdminTemplate.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace AdminTemplate.Queries.Queries
{
    public class UsersQuery : IUsersQuery
    {
        private readonly IUnitOfWork _uow;

        public UsersQuery(IUnitOfWork uow)
        {
            _uow = uow;
        }

        public IQueryable<User> Get()
        {
            var query = GetQuery();

            return query;
        }

        private IQueryable<User> GetQuery()
        {
            return _uow.Query<User>()
                .Where(x => !x.IsDeleted)
                .Include(x => x.Roles)
                    .ThenInclude(x => x.Role);
        }

        public User Get(int id)
        {
            var user = GetQuery().FirstOrDefault(x => x.ID == id);

            if (user == null)
            {
                throw new NotFoundException("User is not found");
            }

            return user;
        }

        public async Task<User> Create(CreateUserModel model)
        {
            var username = model.Username.Trim();

            if (GetQuery().Any(u => u.UserName == username))
            {
                throw new BadRequestException("The username is already in use");
            }

            var user = new User
            {
                UserName = model.Username.Trim(),
                Password = model.Password.Trim().WithBCrypt(),
                FirstName = model.FirstName.Trim(),
                LastName = model.LastName.Trim(),
            };

            AddUserRoles(user, model.Roles);

            _uow.Add(user);
            await _uow.CommitAsync();

            return user;
        }

        private void AddUserRoles(User user, string[] roleNames)
        {
            user.Roles.Clear();

            foreach (var roleName in roleNames)
            {
                var role = _uow.Query<Role>().FirstOrDefault(x => x.Name == roleName);

                if (role == null)
                {
                    throw new NotFoundException($"Role - {roleName} is not found");
                }

                user.Roles.Add(new UserRole { User = user, Role = role });
            }
        }

        public async Task<User> Update(int id, UpdateUserModel model)
        {
            var user = GetQuery().FirstOrDefault(x => x.ID == id);

            if (user == null)
            {
                throw new NotFoundException("User is not found");
            }

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.Adress = model.Adress;
            user.City = model.City;
            user.Country = model.Country;
            user.Info = model.Info;
            user.Code = model.Code;

            await _uow.CommitAsync();
            return user;
        }

        public async Task Delete(int id)
        {
            var user = GetQuery().FirstOrDefault(u => u.ID == id);

            if (user == null)
            {
                throw new NotFoundException("User is not found");
            }

            if (user.IsDeleted) return;

            user.IsDeleted = true;
            await _uow.CommitAsync();
        }

        public async Task ChangePassword(int id, ChangeUserPasswordModel model)
        {
            var user = Get(id);
            user.Password = model.Password.WithBCrypt();
            await _uow.CommitAsync();
        }
    }
}
