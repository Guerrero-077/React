using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class UserSedeer : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente
            builder.Property(u => u.name)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.password)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.email)
                .HasColumnType("varchar(150)");

            builder.HasData(
                new User
                {
                    id = 1,
                    name = "admin",
                    email = "admin@example.com",
                    password = "admin123",
                    active = true,
                    is_deleted = false,
                    PersonId = 1,
                    created_date = new DateTime(2025, 1, 1)
                },
                new User
                {
                    id = 2,
                    name = "User",
                    email = "User@example.com",
                    password = "user123",
                    active = true,
                    is_deleted = false,
                    PersonId = 2,
                    created_date = new DateTime(2025, 1, 1)
                }

            );
        }
    }
}
