import { useEffect, useState } from 'react';

const vazio = {
  Name: '',
  Email: '',
  Phone: '',
};

// Formata o telefone em tempo real para o padrão brasileiro.
// O DDD aparece entre parênteses e o campo aceita apenas dígitos, sem letras ou símbolos.
const formatarTelefone = (value) => {
  const digits = String(value || '').replace(/\D/g, '').slice(0, 11);

  if (digits.length === 0) {
    return '';
  }

  const ddd = digits.slice(0, 2);
  const restante = digits.slice(2);

  if (restante.length === 0) {
    return `(${ddd}`;
  }

  if (restante.length <= 4) {
    return `(${ddd}) ${restante}`;
  }

  if (restante.length <= 8) {
    return `(${ddd}) ${restante.slice(0, 4)}-${restante.slice(4)}`;
  }

  return `(${ddd}) ${restante.slice(0, 5)}-${restante.slice(5, 9)}`;
};

function ClienteForm({ onSubmit, clienteEditado, onCancel }) {
  const [form, setForm] = useState(vazio);

  useEffect(() => {
    if (clienteEditado) {
      setForm({
        Name: clienteEditado.Name || '',
        Email: clienteEditado.Email || '',
        Phone: formatarTelefone(clienteEditado.Phone || ''),
      });
    } else {
      setForm(vazio);
    }
  }, [clienteEditado]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'Phone') {
      setForm((anterior) => ({ ...anterior, Phone: formatarTelefone(value) }));
      return;
    }

    setForm((anterior) => ({ ...anterior, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Remove a máscara visual antes de validar e salvar.
    // Assim, o backend recebe somente números puros.
    const phoneDigits = form.Phone.replace(/\D/g, '');
    if (form.Phone && phoneDigits.length === 0) {
      window.alert('O telefone deve conter apenas números inteiros.');
      return;
    }

    if (form.Phone && (phoneDigits.length < 10 || phoneDigits.length > 11)) {
      window.alert('O telefone deve ter DDD e 8 ou 9 dígitos.');
      return;
    }

    onSubmit({ ...form, Phone: phoneDigits });
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
            placeholder="(DD) 00000-0000"
            inputMode="numeric"
            pattern="[0-9]*"
            style={{ color: '#111827' }}
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
