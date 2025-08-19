namespace Entity.DTOs.Select
{
    public class RolFormPermissionSelectDto
    {
        public int id { get; set; }
        public int rolid { get; set; }
        public int formid { get; set; }
        public int permissionid { get; set; }
        public string permissionName { get; set; }
        public string rolName { get; set; }
        public string formName { get; set; }
    }
}
