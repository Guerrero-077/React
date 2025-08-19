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
    public class PersonService : BusinessBasic<PersonDto, Person>, IPersonService
    {
        private readonly ILogger<PersonService> _logger;
        //protected override IData<Person> Data => _unitOfWork.Persons;
        protected readonly IData<Person> Data;
        public PersonService(IData<Person> data, IMapper mapper, ILogger<PersonService> logger) : base(data, mapper)
        {
            Data = data;
            _logger = logger;
        }


        //protected override void ValidateDto(PersonDto dto)
        //{
        //    if (dto == null)
        //    {
        //        throw new ValidationException("El objeto Person no puede ser nulo");
        //    }

        //    if (string.IsNullOrWhiteSpace(dto.first_name))
        //    {
        //        _logger.LogWarning("Se intentó crear/actualizar una Person con Name vacío");
        //        throw new ValidationException("name", "El Name de la Person es obligatorio");
        //    }
        //}

        //protected override async Task ValidateIdAsync(int id)
        //{
        //    var entity = await Data.GetByIdAsync(id);
        //    if (entity == null)
        //    {
        //        _logger.LogWarning($"Se intentó operar un ID inválido: {id}");
        //        throw new EntityNotFoundException($"No se encontró un Person con el ID {id}");
        //    }
        //}
    }
}
