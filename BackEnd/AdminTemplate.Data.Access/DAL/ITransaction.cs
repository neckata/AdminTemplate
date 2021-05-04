using System;

namespace AdminTemplate.Data.Access.DAL
{
    public interface ITransaction : IDisposable
    {
        void Commit();

        void Rollback();
    }
}
