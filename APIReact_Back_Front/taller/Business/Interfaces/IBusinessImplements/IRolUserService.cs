using Business.Interfaces.BusinessBasic;
using Entity.DTOs.Default;
using Entity.DTOs.Select;

namespace Business.Interfaces.IBusinessImplements
{
    public interface IRolUserService : IBusiness<RolUserDto>
    {
        //Task<IEnumerable<RolUserDto>> GetAllRolUsersAsync();
        //Task AddRolUserAsync(RolUserDto dto);
        //Task DeleteRolUserAsync(int rolId, int userId);
        Task<IEnumerable<string>> GetAllRolUser(int idUser);
        //Task<RolUserDto> AsignateUserRTo(User user);
        Task<RolUserDto> AsignateUserRTo(int userId);
    }
}
