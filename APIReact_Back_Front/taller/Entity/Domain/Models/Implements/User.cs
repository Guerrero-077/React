using Entity.Domain.Models.Base;
using Entity.Infrastructure.Anotation;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity.Domain.Models.Implements
{
    public class User : BaseModel
    {
        public string name { get; set; }
        public string? password { get; set; 
        public string email { get; set; }


        // Foreign key
        [ForeignKey("Person")]
        public int? PersonId { get; set; }

        // Navegación hacia Person
        [ForeignInclude(["firstName", "lastName"])]
        public Person? Person { get; set; }

        public List<RolUser> rolUsers { get; set; } = new();
    }

}
