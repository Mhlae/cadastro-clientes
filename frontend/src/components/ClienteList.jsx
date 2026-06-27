function ClienteList({ clientes, carregando, onEdit, onDelete }) {
  if (carregando) {
    return (
      <section className="list-card">
        <h2>Clientes cadastrados</h2>
        <p>Carregando...</p>
      </section>
    );
  }

  return (
    <section className="list-card">
      <h2>Clientes cadastrados</h2>
      {clientes.length === 0 ? (
        <p className="empty-state">Nenhum cliente cadastrado ainda.</p>
      ) : (
        <ul className="client-list">
          {clientes.map((cliente) => (
            <li key={cliente.PersonID} className="client-item">
              <div>
                <strong>{cliente.Name}</strong>
                <p>{cliente.Email || 'Sem e-mail'}</p>
                <p>{cliente.Phone || 'Sem telefone'}</p>
              </div>

              <div className="client-actions">
                <button type="button" onClick={() => onEdit(cliente)}>
                  Editar
                </button>
                <button type="button" onClick={() => onDelete(cliente.PersonID)}>
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ClienteList;
