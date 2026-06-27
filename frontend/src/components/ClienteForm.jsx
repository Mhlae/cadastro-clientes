import { useEffect, useState } from 'react';

const vazio = {
  Name: '',
  Email: '',
  Phone: '',
};

function ClienteForm({ onSubmit, clienteEditado, onCancel }) {
  const [form, setForm] = useState(vazio);

  useEffect(() => {
    if (clienteEditado) {
      setForm({
        Name: clienteEditado.Name || '',
        Email: clienteEditado.Email || '',
        Phone: clienteEditado.Phone || '',
      });
    } else {
      setForm(vazio);
    }
  }, [clienteEditado]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(form);
  };

  return (
    <section className="form-card">
      <h2>{clienteEditado ? 'Editar cliente' : 'Novo cliente'}</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        <label>
          Nome
          <input
            name="Name"
            value={form.Name}
            onChange={handleChange}
            placeholder="Digite o nome"
            required
          />
        </label>

        <label>
          E-mail
          <input
            name="Email"
            type="email"
            value={form.Email}
            onChange={handleChange}
            placeholder="Digite o e-mail"
          />
        </label>

        <label>
          Telefone
          <input
            name="Phone"
            value={form.Phone}
            onChange={handleChange}
            placeholder="Digite o telefone"
          />
        </label>

        <div className="button-row">
          <button type="submit">Salvar</button>
          {clienteEditado ? (
            <button type="button" onClick={onCancel}>
              Cancelar
            </button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

export default ClienteForm;
