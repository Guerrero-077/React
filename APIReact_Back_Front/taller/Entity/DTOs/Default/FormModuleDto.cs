using Entity.Domain.Interfaces;
using Entity.DTOs.Base;

namespace Entity.DTOs.Default
{
    public class FormModuleDto : BaseDto
    {
        public int formid { get; set; }
        public int moduleid { get; set; }
    }
}
