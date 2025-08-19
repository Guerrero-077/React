using Entity.Domain.Models.Implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity.Infrastructure.DataInit
{
    public class RolFormPermissionSeeder : IEntityTypeConfiguration<RolFormPermission>
    {
        public void Configure(EntityTypeBuilder<RolFormPermission> builder)
        {
            builder.Property(u => u.id)
                .ValueGeneratedOnAdd(); // La base de datos generará el ID automáticamente

            builder.HasData(
                new RolFormPermission
                {
                    id = 1,
                    rolid = 1,
                    formid = 1,
                    permissionid = 1,
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)
                },
                new RolFormPermission
                {
                    id = 2,
                    rolid = 2,
                    formid = 2,
                    permissionid = 2,
                    active = true,
                    is_deleted = false,
                    created_date = new DateTime(2025, 1, 1)

                }
            );
        }
    }
}
