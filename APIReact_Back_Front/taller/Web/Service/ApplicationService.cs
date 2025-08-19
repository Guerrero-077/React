using Business.Interfaces.BusinessBasic;
using Business.Interfaces.IBusinessImplements;
using Business.Mensajeria;
using Business.Mensajeria.Implements;
using Business.Mensajeria.Interfaces;
using Business.Messaging.Implements;
using Business.Repository;
using Business.Services;
using Data.Interfaces.DataBasic;
using Data.Interfaces.IDataImplement;
using Data.Repositoy;
using Data.Services;
using Entity.Domain.Interfaces;
using Entity.Domain.Models.Implements;
using Entity.DTOs.Default;
using Entity.DTOs.Select;
using Entity.Infrastructure.LogService;
using Helpers.AutoMapper;
using Utilities.Custom;

namespace Web.Service
{
    public static class ApplicationService
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddAutoMapper(typeof(AutoMapperProfile));

            services.AddScoped<IUserService, UserService>();
            
            //Rol Evitando el servicio implementado directamente
            services.AddScoped<IBusiness<RolDto>, BusinessBasic<RolDto, Rol>>();

            services.AddScoped<IFormService, FormService>();
            services.AddScoped<IRolUserService, RolUserService>();
            services.AddScoped<IModuleService, ModuleService>();
            services.AddScoped<IPermissionService, PermissionService>();
            services.AddScoped<IPersonService, PersonService>();
            services.AddScoped<IFormModuleService, FormModuleService>();
            services.AddScoped<IRolFormPermissionService, RolFormPermissionService>();


            services.AddScoped<EncriptePassword>();

            // Servicio de Mensajeria
            services.AddTransient<IServiceEmail, ServiceEmail>();
            services.AddScoped<INotifyManager, NotifyManager>();
            services.AddScoped<IServiceTelegram, ServiceTelegram>();

            // Auditoría
            services.AddScoped<IAuditService, AuditService>();
            services.AddHttpContextAccessor(); // <-- Para IHttpContextAccessor

            // Data genérica y repositorios
            services.AddScoped(typeof(IData<>), typeof(DataGeneric<>));
            services.AddScoped<IRolUserRepository, RolUserRepository>();
            services.AddScoped<IFormModuleRepository, FormModuleRepository>();
            services.AddScoped<IRolFormPermissionRepository, RolFormPermissionRepository>();


            services.AddScoped<IUserRepository, UserRepository>();

            //services.AddHttpClient<IApiColombiaGatewayService, ApiColombiaGatewayService>();
            //services.AddScoped<ITouristicAttractionService, TouristicAttractionService>();


            return services;
        }
    }
}
