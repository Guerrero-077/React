using Data.Interfaces.DataBasic;
using Entity.Domain.Models.Implements;
using Entity.DTOs.Default;

namespace Data.Interfaces.IDataImplement
{
    public interface IUserRepository: IData<User> 
    {
        Task<User> ValidateUserAsync(LoginDto loginDto);
        Task<User?> FindEmail(string email);
    }
}
