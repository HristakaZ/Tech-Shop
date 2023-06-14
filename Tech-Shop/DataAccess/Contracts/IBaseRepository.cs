using DataStructure.Models;
using System.Linq.Expressions;

namespace DataAccess.Contracts
{
    public interface IBaseRepository
    {
        (IQueryable<T> Models, int TotalCount) GetAll<T>(Expression<Func<T, bool>>? filter = null,
                                int? page = null,
                                int? pageSize = null) where T : BaseEntity;

        (IQueryable<T> Models, int TotalCount) GetAllWithMultipleFilters<T>(List<Expression<Func<T, bool>>?> filters = null,
                                int? page = null,
                                int? pageSize = null) where T : BaseEntity;

        T GetByID<T>(int id) where T : BaseEntity;

        int Create<T>(T model) where T : BaseEntity;

        void Update<T>(T model) where T : BaseEntity;

        void Delete<T>(T model) where T : BaseEntity;
    }
}
