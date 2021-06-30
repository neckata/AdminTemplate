using System;
using System.Net.Http;
using System.Threading.Tasks;
using AdminTemplate.Api.IntegrationTests.Common;
using AdminTemplate.Api.IntegrationTests.Helpers;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Access.Constants;
using FluentAssertions;
using Xunit;

namespace AdminTemplate.Api.IntegrationTests.Users
{
    [Collection("ApiCollection")]
    public class PutShould
    {
        private readonly ApiServer _server;
        private readonly HttpClientWrapper _client;
        private Random _random;

        public PutShould(ApiServer server)
        {
            _server = server;
            _client = new HttpClientWrapper(_server.Client);
            _random = new Random();
        }

        [Fact]
        public async Task UpdateExistingItem()
        {
            var item = await new Login.PostShould(_server).RegisterNewUser();

            var requestItem = new UpdateUserModel
            {
                FirstName = _random.Next().ToString(),
                LastName = _random.Next().ToString()
            };

            await _client.PutAsync<UserModel>($"api/Users/{item.ID}", requestItem);

            var updatedUser = await GetItemShould.GetById(_client.Client, item.ID);

            updatedUser.FirstName.Should().Be(requestItem.FirstName);
            updatedUser.LastName.Should().Be(requestItem.LastName);

            updatedUser.Roles.Should().HaveCount(1);
            updatedUser.Roles.Should().Contain(Roles.Manager);
        }
    }
}
