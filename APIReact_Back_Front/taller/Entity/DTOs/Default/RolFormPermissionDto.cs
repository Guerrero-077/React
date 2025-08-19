using Entity.Domain.Interfaces;
using Entity.DTOs.Base;

namespace Entity.DTOs.Default
{
    public class RolFormPermissionDto : BaseDto
    {
        public int rolid { get; set; }
        public int formid { get; set; }
        public int permissionid { get; set; }
    }
}
