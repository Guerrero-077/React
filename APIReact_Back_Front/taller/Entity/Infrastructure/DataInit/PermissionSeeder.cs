using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class PermissionSeeder : IEntityTypeConfiguration<Permission>
    {
        public void Configure(EntityTypeBuilder<Permission> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente
            builder.Property(u => u.name)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.description)
                .HasColumnType("varchar(100)");

            builder.HasData(
                new Permission
                {
                    id = 1,
                    name = "Crear",
                    description = "Permiso de creacion",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Permission
                {
                    id = 2,
                    name = "Borrar",
                    description = "Permiso de borrar",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Permission
                {
                    id = 3,
                    name = "Actualizar",
                    description = "Permiso de Actualizar",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Permission
                {
                    id = 4,
                    name = "Leer",
                    description = "Permiso de Leer",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                }

            );
        }
    }
}
