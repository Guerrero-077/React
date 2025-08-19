using Data.Interfaces.IDataImplement;
using Data.Repositoy;
using Entity.Domain.Models.Implements;
using Entity.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Data.Services
{
    public class RolFormPermissionRepository : DataGeneric<RolFormPermission>, IRolFormPermissionRepository
    {
        public RolFormPermissionRepository(ApplicationDbContext context) : base(context)
        {
        }

        public override async Task<IEnumerable<RolFormPermission>> GetAllAsync()
        {
            return await _context.Set<RolFormPermission>()
                        .Include(u => u.rol)
                        .Include(u => u.form)
                        .Include(u => u.permission)
                        .Where(u => u.is_deleted == false)

                        .ToListAsync();
        }

        public override async Task<IEnumerable<RolFormPermission>> GetDeletes()
        {
            return await _context.Set<RolFormPermission>()
                        .Include(u => u.rol)
                        .Include(u => u.form)
                        .Include(u => u.permission)
                        .Where(u => u.is_deleted == true)
                        .ToListAsync();
        }

        public override async Task<RolFormPermission?> GetByIdAsync(int id)
        {
            return await _context.Set<RolFormPermission>()
                      .Include(u => u.rol)
                      .Include(u => u.form)
                      .Include(u => u.permission)
                      .FirstOrDefaultAsync(u => u.id == id);

        }
    }
}
