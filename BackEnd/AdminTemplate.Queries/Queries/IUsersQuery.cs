using System.Linq;
using System.Threading.Tasks;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Data.Model;

namespace AdminTemplate.Queries.Queries
{
    public interface IUsersQuery
    {
        IQueryable<User> Get();

        User Get(int id);

        Task<User> Create(CreateUserModel model);

        Task<User> Update(int id, UpdateUserModel model);

        Task Delete(int id);

        Task ChangePassword(int id, ChangeUserPasswordModel model);
    }
}
