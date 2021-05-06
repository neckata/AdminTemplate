using Xunit;

namespace AdminTemplate.Api.IntegrationTests.Common
{
    [CollectionDefinition("ApiCollection")]
    public class DbCollection : ICollectionFixture<ApiServer>
    {
    }
}
