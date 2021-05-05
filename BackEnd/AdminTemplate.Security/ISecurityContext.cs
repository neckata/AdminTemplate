using AdminTemplate.Data.Model;

namespace AdminTemplate.Security
{
    public interface ISecurityContext
    {
        User User { get; }

        bool IsAdministrator { get; }
    }
}
