using Entity.Domain.Interfaces;
using Entity.DTOs.Base;

namespace Entity.DTOs.Default
{
    public class RolUserDto : BaseDto
    {
        public int userId { get; set;}
        public int rolId {  get; set;}
    }
}
