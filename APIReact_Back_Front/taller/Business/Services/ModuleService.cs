using AutoMapper;
using Business.Interfaces.IBusinessImplements;
using Business.Repository;
using Data.Interfaces.DataBasic;
using Entity.Domain.Models.Implements;
using Entity.DTOs.Default;
using Entity.DTOs.Select;
using Microsoft.Extensions.Logging;
using Utilities.Exceptions;

namespace Business.Services
{
    public class ModuleService : BusinessBasic<ModuleDto, Module>, IModuleService
    {
        private readonly ILogger<ModuleService> _logger;

        protected readonly IData<Module> Data;
        //protected override IData<Module> Data => _unitOfWork.Modules;
        public ModuleService(IData<Module> data, IMapper mapper, ILogger<ModuleService> logger) : base(data, mapper)
        {
            Data = data;
            _logger = logger;
        }


        //protected override void ValidateDto(ModuleDto dto)
        //{
        //    if (dto == null)
        //    {
        //        throw new ValidationException("El objeto Module no puede ser nulo");
        //    }

        //    if (string.IsNullOrWhiteSpace(dto.name))
        //    {
        //        _logger.LogWarning("Se intentó crear/actualizar una Module con Name vacío");
        //        throw new ValidationException("name", "El Name de la Module es obligatorio");
        //    }
        //}

        //protected override async Task ValidateIdAsync(int id)
        //{
        //    var entity = await Data.GetByIdAsync(id);
        //    if (entity == null)
        //    {
        //        _logger.LogWarning($"Se intentó operar un ID inválido: {id}");
        //        throw new EntityNotFoundException($"No se encontró un Module con el ID {id}");
        //    }
        //}
    }
}
