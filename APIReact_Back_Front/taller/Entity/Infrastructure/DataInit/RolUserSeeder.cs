using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class RolUserSeeder : IEntityTypeConfiguration<RolUser>
    {
        public void Configure(EntityTypeBuilder<RolUser> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente
            builder.HasData(
                new RolUser
                {
                    id = 1,
                    userId = 1,
                    rolId = 1,
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                }
            );
        }
    }
}
