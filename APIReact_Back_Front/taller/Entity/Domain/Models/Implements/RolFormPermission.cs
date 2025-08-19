using Entity.Domain.Models.Base;
using Entity.Infrastructure.Anotation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity.Domain.Models.Implements
{
    public class RolFormPermission : BaseModel
    {

        [Required]
        [ForeignKey(nameof(rol))]
        public int rolid { get; set; }

        [Required]
        [ForeignKey(nameof(form))]
        public int formid { get; set; }

        [Required]
        [ForeignKey(nameof(permission))]
        public int permissionid { get; set; }

        // Relaciones de navegación
        [ForeignInclude(["name"])]
        public Rol rol { get; set; }
        [ForeignInclude(["name"])]
        public Form form { get; set; }
        [ForeignInclude(["name"])]
        public Permission permission { get; set; }
    }
}
