using Microsoft.EntityFrameworkCore;

namespace AdminTemplate.Data.Access.Maps.Common
{
    public interface IMap
    {
        void Visit(ModelBuilder builder);
    }
}
