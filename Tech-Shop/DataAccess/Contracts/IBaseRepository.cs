using DataStructure.Models;
namespace DataAccess.Contracts
{
    public interface IBaseRepository
    {
        IQueryable<T> GetAll<T>() where T : BaseEntity;

        T GetByID<T>(int id) where T : BaseEntity;

        void Create<T>(T model) where T : BaseEntity;

        void Update<T>(T model) where T : BaseEntity;

        void Delete<T>(T model) where T : BaseEntity;
    }
}
