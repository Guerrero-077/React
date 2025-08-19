using Entity.Domain.Interfaces;
using Entity.DTOs.Base;

namespace Entity.DTOs.Default
{
    public class UserDto : BaseDto
    {
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int? PersonId { get; set; }

    }
}
