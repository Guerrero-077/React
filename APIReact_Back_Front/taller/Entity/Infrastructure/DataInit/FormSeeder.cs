using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class FormSeeder : IEntityTypeConfiguration<Form>
    {
        public void Configure(EntityTypeBuilder<Form> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente

            builder.Property(u => u.name)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.description)
                .HasColumnType("varchar(100)");

            builder.HasData(
                new Form
                {
                    id = 1,
                    name = "Form User",
                    description = "Form Update User",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Form
                {
                    id = 2,
                    name = "Form Rol",
                    description = "Form Create Rol",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)

                }
            );
        }
    }
}
