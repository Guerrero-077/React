using Business.Interfaces.BusinessBasic;
using Entity.Domain.Models.Implements;
using Entity.DTOs.Default;
using Entity.DTOs.Select;

namespace Business.Interfaces.IBusinessImplements
{
    public interface IUserService : IBusiness<UserDto>
    {
        Task<UserDto> CreateAsyncUser(UserDto dto); 
        Task<User> createUserGoogle(string email, string name);
    }
}
