using Entity.Domain.Models.Base;

namespace Entity.Domain.Models.Implements
{
    public class Form : BaseModelGeneric
    {
        // Relaciones
        public List<RolFormPermission> rol_form_permission { get; set; } = new List<RolFormPermission>();

        public List<FormModule> FormModules { get; set; } = new List<FormModule>();
    }
}
