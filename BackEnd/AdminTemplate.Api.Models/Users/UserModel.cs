namespace AdminTemplate.Api.Models.Users
{
    public class UserModel
    {
        public UserModel()
        {
            Roles = new string[0];
        }

        public int ID { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Info { get; set; }

        public string Adress { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Code { get; set; }

        public string[] Roles { get; set; }
    }
}
