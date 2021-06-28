using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using AdminTemplate.Api.Common.Exceptions;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Access.DAL;
using AdminTemplate.Data.Access.Helpers;
using AdminTemplate.Data.Model;
using AdminTemplate.Queries.Queries;
using AdminTemplate.Queries.Tests.Helpers;
using FluentAssertions;
using Moq;
using Xunit;

namespace AdminTemplate.Queries.Tests
{
    public class UsersQueryTests
    {
        private Mock<IUnitOfWork> _uow;
        private List<User> _userList;
        private IUsersQuery _query;
        private Random _random;
        private List<Role> _roleList;

        public UsersQueryTests()
        {
            _random = new Random();
            _uow = new Mock<IUnitOfWork>();

            _userList = new List<User>();
            _uow.Setup(x => x.Query<User>()).Returns(() => _userList.AsQueryable());

            _roleList = new List<Role>();
            _uow.Setup(x => x.Query<Role>()).Returns(() => _roleList.AsQueryable());

            _query = new UsersQuery(_uow.Object);
        }

        [Fact]
        public async Task GetShouldReturnAll()
        {
            _userList.Add(new User());

            var result = _query.Get();
            result.Count().Should().Be(1);
        }

        [Fact]
        public async Task GetShouldReturnAllExceptDeleted()
        {
            _userList.Add(new User());
            _userList.Add(new User { IsDeleted = true });
            _userList.Add(new User { IsDeleted = true });

            var result = _query.Get();
            result.Count().Should().Be(1);
        }

        [Fact]
        public void GetShouldReturnUserByID()
        {
            var user = new User { ID = _random.Next() };
            _userList.Add(user);

            var result = _query.Get(user.ID);
            result.Should().Be(user);
        }

        [Fact]
        public void GetShouldThrowExceptionIfUserIsNotFoundByID()
        {
            var user = new User { ID = _random.Next() };
            _userList.Add(user);

            Action get = () =>
            {
                _query.Get(_random.Next());
            };

            get.Should().Throw<NotFoundException>();
        }

        [Fact]
        public void GetShouldThrowExceptionIfUserIsDeleted()
        {
            var user = new User { ID = _random.Next(), IsDeleted = true };
            _userList.Add(user);

            Action get = () =>
            {
                _query.Get(user.ID);
            };

            get.Should().Throw<NotFoundException>();
        }

        [Fact]
        public async Task CreateShouldSaveNewUser()
        {
            var model = new CreateUserModel
            {
                Password = _random.Next().ToString(),
                Username = _random.Next().ToString(),
                LastName = _random.Next().ToString(),
                FirstName = _random.Next().ToString(),
            };

            var result = await _query.Create(model);

            result.Password.Should().NotBeEmpty();
            result.UserName.Should().Be(model.Username);
            result.LastName.Should().Be(model.LastName);
            result.FirstName.Should().Be(model.FirstName);

            _uow.Verify(x => x.Add(result));
            _uow.Verify(x => x.CommitAsync());
        }

        [Fact]
        public async Task CreateShouldAddUserRoles()
        {
            var role = new Role
            {
                Name = _random.Next().ToString()
            };
            _roleList.Add(role);

            var model = new CreateUserModel
            {
                Password = _random.Next().ToString(),
                Username = _random.Next().ToString(),
                LastName = _random.Next().ToString(),
                FirstName = _random.Next().ToString(),
                Roles = new[] { role.Name }
            };

            var result = await _query.Create(model);

            result.Roles.Should().HaveCount(1);
            result.Roles.Should().Contain(x => x.User == result && x.Role == role);
        }

        [Fact]
        public void CreateShouldThrowExceptionIfUsernameIsNotUnique()
        {
            var model = new CreateUserModel
            {
                Username = _random.Next().ToString(),
            };

            _userList.Add(new User { UserName = model.Username });

            Action create = () =>
            {
                var x = _query.Create(model).Result;
            };

            create.Should().Throw<BadRequestException>();
        }

        [Fact]
        public async Task UpdateShouldUpdateUserFields()
        {
            var user = new User { ID = _random.Next() };
            _userList.Add(user);

            var model = new UpdateUserModel
            {
                Username = _random.Next().ToString(),
                LastName = _random.Next().ToString(),
                FirstName = _random.Next().ToString(),
            };

            var result = await _query.Update(user.ID, model);

            result.Should().Be(user);
            result.UserName.Should().Be(model.Username);
            result.LastName.Should().Be(model.LastName);
            result.FirstName.Should().Be(model.FirstName);

            _uow.Verify(x => x.CommitAsync());
        }

        [Fact]
        public async Task UpdateShouldUpdateRoles()
        {
            var role = new Role
            {
                Name = _random.Next().ToString()
            };
            _roleList.Add(role);

            var user = new User
            {
                ID = _random.Next(),
                Roles = new List<UserRole>
                {
                    new UserRole()
                }
            };
            _userList.Add(user);

            var model = new UpdateUserModel
            {
                LastName = _random.Next().ToString(),
                FirstName = _random.Next().ToString(),
                Roles = new[] { role.Name }
            };

            var result = await _query.Update(user.ID, model);

            result.Roles.Should().HaveCount(1);
            result.Roles.Should().Contain(x => x.User == result && x.Role == role);
        }

        [Fact]
        public void UpdateShoudlThrowExceptionIfUserIsNotFound()
        {
            Action create = () =>
            {
                var result = _query.Update(_random.Next(), new UpdateUserModel()).Result;
            };

            create.Should().Throw<NotFoundException>();
        }

        [Fact]
        public async Task DeleteShouldMarkUserAsDeleted()
        {
            var user = new User { ID = _random.Next() };
            _userList.Add(user);

            await _query.Delete(user.ID);

            user.IsDeleted.Should().BeTrue();

            _uow.Verify(x => x.CommitAsync());
        }

        [Fact]
        public void DeleteShoudlThrowExceptionIfUserIsNotFound()
        {
            Action create = () =>
            {
                _query.Delete(_random.Next()).Wait();
            };

            create.Should().Throw<NotFoundException>();
        }

        [Fact]
        public async Task ChangePasswordShouldChangeUsersPassword()
        {
            var user = new User { ID = _random.Next() };
            _userList.Add(user);

            var newPassword = _random.Next().ToString();

            await _query.ChangePassword(user.ID, new ChangeUserPasswordModel
            {
                Password = newPassword
            });

            user.Password.Should().NotBeEmpty();

            _uow.Verify(x => x.CommitAsync());
        }
    }
}
