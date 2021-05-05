using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace AdminTemplate.Queries.Tests.Helpers
{
    public class TestAsyncEnumerable<T> : IAsyncEnumerable<T>, IQueryable<T>
    {
        private IQueryable<T> _query;

        public TestAsyncEnumerable(IEnumerable<T> items)
        {
            _query = items.AsQueryable();
        }

        IEnumerator<T> IEnumerable<T>.GetEnumerator()
        {
            return _query.GetEnumerator();
        }

        public IAsyncEnumerator<T> GetAsyncEnumerator(CancellationToken cancellationToken = default)
        {
            return (IAsyncEnumerator<T>)new TestAsyncEnumerable<T>.Enumerator(this._query);
        }

        private sealed class Enumerator : IAsyncEnumerator<T>, IDisposable
        {
            private readonly IEnumerator<T> _items;

            public T Current
            {
                get { return _items.Current; }
            }

            public Enumerator(IEnumerable<T> items)
            {
                _items = items.GetEnumerator();
            }

            public bool MoveNext(CancellationToken cancellationToken)
            {
                cancellationToken.ThrowIfCancellationRequested();
                return _items.MoveNext();
            }

            void IDisposable.Dispose()
            {
            }

            public ValueTask<bool> MoveNextAsync()
            {
                throw new NotImplementedException();
            }

            public ValueTask DisposeAsync()
            {
                throw new NotImplementedException();
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return _query.GetEnumerator();
        }

        public Type ElementType { get { return typeof(T); } }

        public Expression Expression { get { return _query.Expression; } }

        public IQueryProvider Provider { get { return _query.Provider; } }

        public IAsyncEnumerable<T> AsyncEnumerable { get { return this; } }
    }
}
