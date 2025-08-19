namespace Entity.Infrastructure.Anotation
{
    [AttributeUsage(AttributeTargets.Property, AllowMultiple = false)]
    public class ForeignIncludeAttribute : Attribute
    {
        public string[]? SelectPath { get; }

        public ForeignIncludeAttribute(string[]? selectPath = null)
        {
            SelectPath = selectPath;
        }
    }
}
