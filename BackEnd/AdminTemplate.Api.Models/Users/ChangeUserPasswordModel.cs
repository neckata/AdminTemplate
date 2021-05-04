using System.ComponentModel.DataAnnotations;

namespace AdminTemplate.Api.Models.Users
{
    public class ChangeUserPasswordModel
    {
        [Required]
        public string Password { get; set; }
    }
}
