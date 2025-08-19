using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entity.Infrastructure.DataInit
{
    public class PersonSeeder : IEntityTypeConfiguration<Person>
    {
        public void Configure(EntityTypeBuilder<Person> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente

            builder.Property(u => u.firstName)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.lastName)
                .HasColumnType("varchar(100)");

            builder.Property(u => u.phoneNumber)
                .HasColumnType("varchar(20)");

            builder.Property(u => u.address)
                .HasColumnType("varchar(100)");

            builder.HasData(
                new Person
                {
                    id = 1,
                    firstName = "Admin",
                    lastName = "Admin",
                    phoneNumber = "1234567890",
                    address = "AV SiempreViva",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new Person
                {
                    id = 2,
                    firstName = "User",
                    lastName = "User",
                    phoneNumber = "1234567890",
                    address = "AV SiempreViva",
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                }

            );
        }
    }
}
