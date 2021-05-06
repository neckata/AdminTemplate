using System;
using System.Threading.Tasks;
using AdminTemplate.Api.IntegrationTests.Common;
using AdminTemplate.Api.IntegrationTests.Helpers;
using AdminTemplate.Api.Models.Login;
using AdminTemplate.Api.Models.Users;
using FluentAssertions;
using Xunit;

namespace AdminTemplate.Api.IntegrationTests.Users
{
    [Collection("ApiCollection")]
    public class PostShould
    {
        private readonly ApiServer _server;
        private readonly HttpClientWrapper _client;
        private Random _random;

        public PostShould(ApiServer server)
        {
            _random = new Random();
            _server = server;
            _client = new HttpClientWrapper(_server.Client);
        }

        [Fact]
        public async Task ChangePassword()
        {
            var newUser = await new Login.PostShould(_server).RegisterNewUser();
            var newPassword = _random.Next().ToString();
            await _client.PostAsync($"api/Users/{newUser.ID}/password", new ChangeUserPasswordModel
            {
                Password = newPassword
            });

            //Should be able to login
            var loginedUser = await new Login.PostShould(_server).Autheticate(newUser.Username, newPassword);
            loginedUser.User.Username.Should().Be(newUser.Username);
        }
    }
}
