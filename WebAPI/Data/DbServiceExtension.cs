using Microsoft.EntityFrameworkCore;

namespace WebAPI.Data
{
    public static class DbServiceExtension
    {
        public static void AddDataBaseService(this IServiceCollection services, string connectionString)
        => services.AddDbContext<DataContext>(option => option.UseSqlServer(connectionString));
    }
}
