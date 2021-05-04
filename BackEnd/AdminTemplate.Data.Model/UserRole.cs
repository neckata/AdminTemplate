namespace AdminTemplate.Data.Model
{
    public class UserRole
    {
        public int ID { get; set; }

        public int UserID { get; set; }

        public virtual User User { get; set; }

        public int RoleID { get; set; }

        public virtual Role Role { get; set; }
    }
}
