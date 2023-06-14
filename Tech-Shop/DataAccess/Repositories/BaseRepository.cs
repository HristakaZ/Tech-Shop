using DataAccess.Contracts;
using DataStructure.Models;
using System.Linq.Expressions;

namespace DataAccess.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        private readonly ApplicationDbContext applicationDbContext;

        public BaseRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public (IQueryable<T> Models, int TotalCount) GetAll<T>(Expression<Func<T, bool>>? filter = null,
                                int? page = null,
                                int? pageSize = null) where T : BaseEntity
        {
            IQueryable<T> set = this.applicationDbContext.Set<T>();
            if (filter != null)
            {
                set = set.Where(filter);
            }

            int totalCount = set.Count();

            if (page.HasValue && pageSize.HasValue)
            {
                set = set.Skip(pageSize.Value * (page.Value - 1)).Take(pageSize.Value);
            }

            return (set, totalCount);
        }

        public (IQueryable<T> Models, int TotalCount) GetAllWithMultipleFilters<T>(List<Expression<Func<T, bool>>?> filters = null,
                                int? page = null,
                                int? pageSize = null) where T : BaseEntity
        {
            IQueryable<T> set = this.applicationDbContext.Set<T>();
            if (filters != null)
            {
                foreach (Expression<Func<T, bool>?> filter in filters)
                {
                    if (filter != null)
                    {
                        set = set.Where(filter!);
                    }
                }
            }

            int totalCount = set.Count();

            if (page.HasValue && pageSize.HasValue)
            {
                set = set.Skip(pageSize.Value * (page.Value - 1)).Take(pageSize.Value);
            }

            return (set, totalCount);
        }

        public T GetByID<T>(int id) where T : BaseEntity
        {
            return this.applicationDbContext.Set<T>().FirstOrDefault(x => x.ID == id);
        }

        public int Create<T>(T model) where T : BaseEntity
        {
            this.applicationDbContext.Add<T>(model);
            this.applicationDbContext.SaveChanges();

            return model.ID;
        }

        public void Update<T>(T model) where T : BaseEntity
        {
            this.applicationDbContext.Update<T>(model);
            this.applicationDbContext.SaveChanges();
        }

        public void Delete<T>(T model) where T : BaseEntity
        {
            this.applicationDbContext.Remove<T>(model);
            this.applicationDbContext.SaveChanges();
        }
    }
}
