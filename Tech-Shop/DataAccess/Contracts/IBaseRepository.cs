using DataStructure.Models;
using System.Linq.Expressions;

namespace DataAccess.Contracts
{
    public interface IBaseRepository
    {
        IQueryable<T> GetAll<T>(Expression<Func<T, bool>>? filter = null) where T : BaseEntity;

        T GetByID<T>(int id) where T : BaseEntity;

        int Create<T>(T model) where T : BaseEntity;

        void Update<T>(T model) where T : BaseEntity;

        void Delete<T>(T model) where T : BaseEntity;
    }
}
