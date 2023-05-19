﻿using DataAccess.Contracts;
using DataStructure.Models;

namespace DataAccess.Repositories
{
    public class BaseRepository : IBaseRepository
    {
        private readonly ApplicationDbContext applicationDbContext;

        public BaseRepository(ApplicationDbContext applicationDbContext)
        {
            this.applicationDbContext = applicationDbContext;
        }

        public IQueryable<T> GetAll<T>() where T : BaseEntity
        {
            return this.applicationDbContext.Set<T>();
        }

        public T GetByID<T>(int id) where T : BaseEntity
        {
            return this.applicationDbContext.Set<T>().FirstOrDefault(x => x.ID == id);
        }

        public int Create<T>(T model) where T : BaseEntity
        {
            this.applicationDbContext.Add<T>(model);
            this.applicationDbContext.SaveChanges();
            this.applicationDbContext.Entry<T>(model).GetDatabaseValues();

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
