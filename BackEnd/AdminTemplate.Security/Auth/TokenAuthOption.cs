using System;
using Microsoft.IdentityModel.Tokens;

namespace AdminTemplate.Security.Auth
{
    public class TokenAuthOption
    {
        public static string Audience { get; } = "AdminTemplateAudience";

        public static string Issuer { get; } = "AdminTemplateIssuer";

        public static RsaSecurityKey Key { get; } = new RsaSecurityKey(RSAKeyHelper.GenerateKey());

        public static SigningCredentials SigningCredentials { get; } = new SigningCredentials(Key, SecurityAlgorithms.RsaSha256Signature);

        public static TimeSpan ExpiresSpan { get; } = TimeSpan.FromMinutes(30);

        public static string TokenType { get; } = "Bearer";
    }
}
