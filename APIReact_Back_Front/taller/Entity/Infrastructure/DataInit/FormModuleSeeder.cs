using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    internal class FormModuleSeeder : IEntityTypeConfiguration<FormModule>
    {
        public void Configure(EntityTypeBuilder<FormModule> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente
            builder.HasData(
                new FormModule
                { 
                    id = 1,
                    formid = 1,
                    moduleid = 1,
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new FormModule
                {
                    id = 2,
                    formid = 2,
                    moduleid = 2,
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)

                }
            );
        }
    }
}
