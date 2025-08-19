using Entity.Domain.Enums;
using System.Dynamic;

namespace Business.Interfaces.BusinessBasic
{
    public interface IBusiness<D>
    {
        Task<IEnumerable<D>> GetAllAsync();
        Task<IEnumerable<D>> GetAllAsync(GetAllType g);
        Task<D?> GetByIdAsync(int id);
        Task<D> CreateAsync(D dto);
        Task<bool> UpdateAsync(D dto);
        Task<bool> DeleteAsync(int id);
        Task<bool> DeleteAsync(int id, DeleteType deleteType);
        Task<bool> RestoreLogical(int id);

        /// <summary>
        /// Obtener listado con relaciones dinámicas
        /// </summary>
        /// <returns>Lista de ExpandoObject</returns>
        Task<List<ExpandoObject>> GetAllDynamicAsync();

    }
}
