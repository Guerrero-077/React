using Data.Interfaces.DataBasic;

namespace Data.Interfaces.IDataImplement
{
    public interface IRolUserRepository : IData<RolUser>
    {
        Task<IEnumerable<string>> GetJoinRolesAsync(int userId);
        //Task<RolUser> AsignateUserRTo(User user);
        Task<RolUser> AsignateUserRTo(int userId);

    }
}
