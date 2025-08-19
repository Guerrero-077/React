using Entity.Infrastructure.Contexts;
using Entity.Infrastructure.LogService;
using Microsoft.EntityFrameworkCore;
using Web.Infrastructure.Web.Infrastructure;

namespace Web.Service
{
    public static class DatabaseService
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            // Registrar HttpContextAccessor para acceder a HttpContext
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();

            // Registrar AuditManager si lo usas en ApplicationDbContext
            services.AddScoped<AuditService>();

            // Registrar configuración para inyección
            services.AddSingleton(configuration);

            // Registrar DbContextFactory
            services.AddScoped<DbContextFactory>();

            // Registrar ApplicationDbContext para que use la fábrica dinámicamente
            services.AddScoped<ApplicationDbContext>(provider =>
            {
                var factory = provider.GetRequiredService<DbContextFactory>();
                return factory.CreateDbContext();
            });

            // Registrar AuditDbContext si es necesario, con proveedor fijo o dinámico
            services.AddDbContext<AuditDbContext>(options =>
                options.UseNpgsql(configuration.GetConnectionString("Audit")));

            return services;
        }
    }
}
