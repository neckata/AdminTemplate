using System;
using AdminTemplate.Data.Model;

namespace AdminTemplate.Queries.Models
{
    public class UserWithToken
    {
        public string Token { get; set; }

        public User User { get; set; }

        public DateTime ExpiresAt { get; set; }
    }
}
