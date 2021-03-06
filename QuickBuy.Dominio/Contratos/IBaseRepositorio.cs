using System;
using System.Collections.Generic;
using System.Text;

namespace QuickBuy.Dominio.Contratos
{
    public interface IBaseRepositorio<TEntity> :IDisposable where TEntity : class
    {
        void Adcionar(TEntity entity);
        TEntity ObterporId(int id);
        IEnumerable<TEntity> ObterTodos();
        void Atualizar(TEntity entity);
        void Remover(TEntity entity);
    }
}
