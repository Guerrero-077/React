using Entity.Domain.Interfaces;
using Entity.Domain.Models.Base;

namespace Helpers.Initialize
{
    public static class InitializeLogical
    {
        public static void InitializeLogicalState(BaseModel entity)
        {
                entity.is_deleted = false;
                entity.active = true;
            //if (entity is BaseModel softDeletable)
            //{
            //}
        }
    }
}
