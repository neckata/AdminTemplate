using AdminTemplate.Data.Access.Maps.Common;
using AdminTemplate.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace AdminTemplate.Data.Access.Maps.Main
{
    public class RoleMap : IMap
    {
        public void Visit(ModelBuilder builder)
        {
            builder.Entity<Role>()
                .ToTable("Roles")
                .HasKey(x => x.ID);
        }
    }
}
