using Entity.Domain.Models.Base;
using Entity.Domain.Models.Implements;
using Entity.Infrastructure.Anotation;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class RolUser : BaseModel
{
    [Required]
    public int userId { get; set; }

    [Required]
    public int rolId { get; set; }

    [ForeignKey(nameof(userId))]
    [ForeignInclude(new[] { "id", "name" })]
    public User user { get; set; }

    [ForeignKey(nameof(rolId))]
    [ForeignInclude(new[] { "id", "name" })]
    public Rol rol { get; set; }
}
