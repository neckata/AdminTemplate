﻿using System.Collections.Generic;

namespace AdminTemplate.Data.Model
{
    public class User
    {
        public User()
        {
            Roles = new List<UserRole>();
        }

        public int ID { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Info { get; set; }

        public string Adress { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Code { get; set; }

        public bool IsDeleted { get; set; }

        public virtual IList<UserRole> Roles { get; set; }
    }
}
