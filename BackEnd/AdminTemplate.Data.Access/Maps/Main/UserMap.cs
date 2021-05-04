using AdminTemplate.Data.Access.Maps.Common;
using AdminTemplate.Data.Model;
using Microsoft.EntityFrameworkCore;

namespace AdminTemplate.Data.Access.Maps.Main
{
    public class UserMap : IMap
    {
        public void Visit(ModelBuilder builder)
        {
            builder.Entity<User>()
                .ToTable("Users")
                .HasKey(x => x.ID);
        }
    }
}
