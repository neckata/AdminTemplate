using System.Threading.Tasks;
using AdminTemplate.Api.Models.Login;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Model;
using AdminTemplate.Queries.Models;

namespace AdminTemplate.Queries.Queries
{
    public interface ILoginQuery
    {
        UserWithToken Authenticate(string username, string password);

        Task<User> Register(RegisterModel model);

        Task ChangePassword(ChangeUserPasswordModel requestModel);
    }
}
