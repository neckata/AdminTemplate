using AdminTemplate.Data.Access.Maps.Common;
using AdminTemplate.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace AdminTemplate.Data.Access.Maps.Main
{
    public class UserRoleMap : IMap
    {
        public void Visit(ModelBuilder builder)
        {
            builder.Entity<UserRole>()
                .ToTable("UserRoles")
                .HasKey(x => x.ID);
        }
    }
}
