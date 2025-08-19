using Business.Interfaces.IBusinessImplements;
using Entity.Domain.Enums;
using Entity.DTOs.Default;
using Entity.DTOs.Select;
using Microsoft.AspNetCore.Mvc;
using Web.Controllers.ControllersBase.Web.Controllers.BaseController;

namespace Web.Controllers.Implements
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    [Produces("application/json")]
    public class RolFormPermissionController : BaseController<RolFormPermissionDto, IRolFormPermissionService>
    {
        public RolFormPermissionController(IRolFormPermissionService service, ILogger<RolFormPermissionController> logger) : base(service, logger)
        {
        }

        protected override Task<IEnumerable<RolFormPermissionDto>> GetAllAsync(GetAllType getAllType) => _service.GetAllAsync(getAllType);
        protected override Task<RolFormPermissionDto?> GetByIdAsync(int id) => _service.GetByIdAsync(id);

        protected override Task AddAsync(RolFormPermissionDto dto) => _service.CreateAsync(dto);

        protected override Task<bool> UpdateAsync(int id, RolFormPermissionDto dto) => _service.UpdateAsync(dto);
        protected override Task<bool> DeleteAsync(int id, DeleteType deleteType) => _service.DeleteAsync(id, deleteType);


        protected override Task<bool> RestaureAsync(int id) => _service.RestoreLogical(id);



        [HttpGet("dynamic")]
        public async Task<IActionResult> GetDynamicAsync()
        {
            var result = await _service.GetAllDynamicAsync();
            return Ok(result);
        }


    }
}
