using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class ModuleSeeder : IEntityTypeConfiguration<Module>
    {
        public void Configure(EntityTypeBuilder<Module> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente
            builder.Property(u => u.name)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.description)
                .HasColumnType("varchar(100)");

            builder.HasData(
                new Module
                {
                    id = 1,
                    name = "Module User",
                    description = "Module for User",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Module
                {
                    id = 2,
                    name = "Module Rol",
                    description = "Module for Rol",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)

                }
            );
        }
    }
}
