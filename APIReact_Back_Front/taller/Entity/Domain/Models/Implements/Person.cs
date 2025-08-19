using Entity.Domain.Models.Base;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entity.Domain.Models.Implements
{
    public class Person : BaseModel
    {
        public string? firstName { get; set; }
        public string? lastName { get; set; }
        public string? phoneNumber { get; set; }
        public string? address { get; set; }


        // Navegación hacia User
        public User? User { get; set; }
    }

}
