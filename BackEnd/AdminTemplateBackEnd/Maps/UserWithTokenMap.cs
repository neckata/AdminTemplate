using AutoMapper;
using AdminTemplate.Api.Models.Users;
using AdminTemplate.Queries.Models;

namespace AdminTemplate.Maps
{
    public class UserWithTokenMap : IAutoMapperTypeConfigurator
    {
        public void Configure(IMapperConfigurationExpression configuration)
        {
            var map = configuration.CreateMap<UserWithToken, UserWithTokenModel>();
        }
    }
}
