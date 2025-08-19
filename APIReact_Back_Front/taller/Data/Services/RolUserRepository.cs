using Data.Interfaces.IDataImplement;
using Data.Repositoy;
using Entity.Domain.Models.Implements;
using Entity.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Data.Services
{
    public class RolUserRepository : DataGeneric<RolUser>, IRolUserRepository
    {
        public RolUserRepository(ApplicationDbContext context) :    base(context)
        {
        }

        public async Task<RolUser> AsignateUserRTo(int userId)
        {
            var rolUser = new RolUser
            {
                userId = userId,
                rolId = 2,
                active = true,
                is_deleted = false
            };

            _context.rolUsers.Add(rolUser);
            await _context.SaveChangesAsync();

            return rolUser;
        }


        public override async Task<IEnumerable<RolUser>> GetAllAsync()
        {
            return await _context.Set<RolUser>()
                        .Include(u => u.rol)
                        .Include(u => u.user)
                        .Where(u => u.is_deleted == false)
                        .ToListAsync();
        }

        public override async Task<IEnumerable<RolUser>> GetDeletes()
        {
            return await _context.Set<RolUser>()
                        .Include(u => u.rol)
                        .Include(u => u.user)
                        .Where(u => u.is_deleted == true)
                        .ToListAsync();
        }


        public override async Task<RolUser?> GetByIdAsync(int id)
        {
            return await _context.Set<RolUser>()
                      .Include(u => u.rol)
                      .Include(u => u.user)
                      .Where(u => u.id == id)
                      .FirstOrDefaultAsync(u => u.is_deleted == false);   

        }

        public async Task<IEnumerable<string>> GetJoinRolesAsync(int idUser)
        {
            var rolAsignated = await _context.Set<RolUser>()
                               .Include(ru => ru.rol)
                               .Include(ru => ru.user)
                               .Where(ru => ru.userId == idUser)
                               .ToListAsync();

            var roles = rolAsignated
                                .Select(ru => ru.rol.name)
                                .Where(name => !string.IsNullOrWhiteSpace(name))
                                .Distinct()
                                .ToList();
            return roles;
        }
    }
}
