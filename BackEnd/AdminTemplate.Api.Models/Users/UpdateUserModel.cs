using System.ComponentModel.DataAnnotations;

namespace AdminTemplate.Api.Models.Users
{
    public class UpdateUserModel
    {
        public UpdateUserModel()
        {

        }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string FirstName { get; set; }

        public string Email { get; set; }

        public string Info { get; set; }

        public string Adress { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Code { get; set; }
    }
}
