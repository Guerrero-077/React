using Business.Interfaces.BusinessBasic;
using Entity.Domain.Enums;
using Entity.Domain.Models.Base;
using Entity.DTOs.Base;
using System.Dynamic;

namespace Business.Repository
{
    public abstract class ABaseModelBusiness<D, TEntity> : IBusiness<D> where TEntity : BaseModel where D : BaseDto
    {

        public abstract Task<IEnumerable<D>> GetAllAsync();  
        public abstract Task<IEnumerable<D>> GetAllAsync(GetAllType g);
        public abstract Task<List<ExpandoObject>> GetAllDynamicAsync();
        public abstract Task<D?> GetByIdAsync(int id);
        public abstract Task<D> CreateAsync(D dto);
        public abstract Task<bool> UpdateAsync(D dto);
        public abstract Task<bool> DeleteAsync(int id);
        public abstract Task<bool> DeleteAsync(int id, DeleteType deleteType);
        public abstract Task<bool> RestoreLogical(int id);



 
    }
}
