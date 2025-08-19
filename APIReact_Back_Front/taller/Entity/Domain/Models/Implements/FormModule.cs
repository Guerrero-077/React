using Entity.Domain.Models.Base;
using Entity.Infrastructure.Anotation;
using System.Runtime.CompilerServices;

namespace Entity.Domain.Models.Implements
{
    public class FormModule : BaseModel
    {
       
        public int formid { get; set; }
        public int moduleid { get; set; }

        // Relaciones de navegación
        [ForeignInclude(["name"])]
        public Form form { get; set; }

        [ForeignInclude(["name"])]
        public Module module { get; set; }
    }
}
