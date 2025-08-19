using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class RolSeeder : IEntityTypeConfiguration<Rol>
    {
        public void Configure(EntityTypeBuilder<Rol> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente
            builder.Property(u => u.name)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.description)
                .HasColumnType("varchar(100)");

            builder.HasData(
                new Rol
                {
                    id = 1,
                    name = "Administrador",
                    description = "Rol con permisos administrativos",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Rol
                {
                    id = 2,
                    name = "Usuario",
                    description = "Rol con permisos de usuario",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)

                }
            );
        }
    }
}
