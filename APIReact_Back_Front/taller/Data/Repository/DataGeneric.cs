using Data.Repository;
using Entity.Domain.Models.Base;
using Entity.Infrastructure.Anotation;
using Entity.Infrastructure.Contexts;
using Helpers.Anotation;
using Microsoft.EntityFrameworkCore;
using System.Dynamic;
using System.Reflection;

namespace Data.Repositoy
{
    public class DataGeneric<T> : ABaseModelData<T> where T : BaseModel
    {
        protected readonly ApplicationDbContext _context;

        public DataGeneric(ApplicationDbContext context)
        {
            _context = context;
        }


        public override async Task<IEnumerable<T>> GetAllAsync()
        {
                return await _context.Set<T>()
                    .Where(e => e.is_deleted == false)
                    .ToListAsync();
        }

        public override async Task<IEnumerable<T>> GetDeletes()
        {
                return await _context.Set<T>()
                    .Where(e => e.is_deleted == true)
                    .ToListAsync();
        }

        public override async Task<T?> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(e => e.is_deleted == false && e.id == id);

            //return entity;
            //if (entity is BaseModel deletable && deletable.is_deleted)
            //    return null;

        }
        public override async Task<T> CreateAsync(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public override async Task<bool> UpdateAsync(T entity)
        {
            _context.Set<T>().Update(entity);
            return await _context.SaveChangesAsync() > 0;
        }
        public override async Task<bool> DeleteAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null) return false;

            _context.Set<T>().Remove(entity);
             return  await _context.SaveChangesAsync() > 0;
        }

        public override async Task<bool> DeleteLogicAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            //if (entity is not BaseModel deletable) return false;

            if (entity == null) return false;
            entity.is_deleted = true;

            _context.Set<T>().Update(entity);
            return await _context.SaveChangesAsync() > 0;
            //return true;
        }


        public override async Task<bool> RestoreAsync(int id)
        {
            var entity = await _context.Set<T>().FindAsync(id);
            if (entity == null) return false;
            entity.is_deleted = false;
            _context.Set<T>().Update(entity);
            return await _context.SaveChangesAsync() > 0;

            //if (!deletable.is_deleted) return false;

            //return true;
        }


        //! Estudiar este Método 


        //public override async Task<List<ExpandoObject>> GetAllDynamicAsync()
        //{
        //    var entityType = typeof(T); // Tipo del modelo genérico T

        //    var query = _context.Set<T>().AsQueryable(); // Se obtiene el DbSet y se convierte en IQueryable

        //    // Buscar propiedades con el atributo personalizado
        //    var foreignKeyProps = entityType
        //        .GetProperties() // Obtener todas las propiedades del modelo
        //        .Where(p => Attribute.IsDefined(p, typeof(ForeignIncludeAttribute))) // Filtrar por las que tienen el atributo
        //        .ToList();

        //    // Se agregan los Includes dinámicamente
        //    foreach (var prop in foreignKeyProps)
        //    {
        //        query = query.Include(prop.Name); // Incluir la propiedad relacionada
        //    }

        //    var resultList = await query.ToListAsync(); // Ejecutar la consulta con EF y traer los datos
        //    var dynamicList = new List<ExpandoObject>(); // Lista que almacenará los objetos dinámicos

        //    // Se recorre cada entidad del resultado
        //    foreach (var entity in resultList)
        //    {
        //        dynamic dyn = new ExpandoObject(); // Se crea un objeto dinámico
        //        var dict = (IDictionary<string, object?>)dyn; // Se accede como diccionario para agregar propiedades

        //        dict["id"] = entityType.GetProperty("id")?.GetValue(entity); // Se obtiene el Id del objeto

        //        // Se recorre cada propiedad con ForeignIncludeAttribute
        //        foreach (var prop in foreignKeyProps)
        //        {
        //            var attr = prop.GetCustomAttribute<ForeignIncludeAttribute>()!;
        //            var foreignValue = prop.GetValue(entity);
        //            if (foreignValue == null) continue;

        //            if (attr.SelectPath is { Length: > 0 })
        //            {
        //                foreach (var path in attr.SelectPath)
        //                {
        //                    var value = ReflectionHelper.GetNestedPropertyValue(foreignValue, path);
        //                    var key = ReflectionHelper.PascalJoin(prop.Name, path);
        //                    dict[key] = value;
        //                }
        //            }
        //            else
        //            {
        //                dict[prop.Name] = foreignValue;
        //            }
        //        }

        //        dynamicList.Add(dyn); // Agregar a la lista de resultados
        //    }

        //    return dynamicList; // Devolver la lista final de objetos dinámicos
        //}

        public override async Task<List<ExpandoObject>> GetAllDynamicAsync()
        {
            var entityType = typeof(T); // Tipo del modelo genérico T

            var query = _context.Set<T>().AsQueryable(); // Se obtiene el DbSet y se convierte en IQueryable

            // Buscar propiedades con el atributo personalizado ForeignInclude
            var foreignKeyProps = entityType
                .GetProperties()
                .Where(p => Attribute.IsDefined(p, typeof(ForeignIncludeAttribute)))
                .ToList();

            // Se agregan los Includes dinámicamente
            foreach (var prop in foreignKeyProps)
            {
                query = query.Include(prop.Name);
            }

            var resultList = await query.ToListAsync(); // Ejecutar la consulta

            var dynamicList = new List<ExpandoObject>(); // Lista para almacenar los objetos dinámicos

            foreach (var entity in resultList)
            {
                dynamic dyn = new ExpandoObject();
                var dict = (IDictionary<string, object?>)dyn;

                // Incluir el Id principal (asume que la propiedad se llama "id")
                dict["id"] = entityType.GetProperty("id")?.GetValue(entity);

                // Incluir claves foráneas explícitas como userId, rolId, etc.
                var foreignKeyIds = entityType
                    .GetProperties()
                    .Where(p => p.PropertyType == typeof(int) && p.Name.EndsWith("id", StringComparison.OrdinalIgnoreCase));

                foreach (var fkProp in foreignKeyIds)
                {
                    dict[fkProp.Name] = fkProp.GetValue(entity);
                }

                // Incluir los campos definidos en ForeignInclude
                foreach (var prop in foreignKeyProps)
                {
                    var attr = prop.GetCustomAttribute<ForeignIncludeAttribute>()!;
                    var foreignValue = prop.GetValue(entity);
                    if (foreignValue == null) continue;

                    if (attr.SelectPath is { Length: > 0 })
                    {
                        foreach (var path in attr.SelectPath)
                        {
                            var value = ReflectionHelper.GetNestedPropertyValue(foreignValue, path);
                            var key = ReflectionHelper.PascalJoin(prop.Name, path);
                            dict[key] = value;
                        }
                    }
                    else
                    {
                        dict[prop.Name] = foreignValue;
                    }
                }

                dynamicList.Add(dyn); // Agregar a la lista de resultados
            }

            return dynamicList; // Devolver la lista final
        }


    }
}

