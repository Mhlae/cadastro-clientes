import { useEffect, useState } from 'react';
import './App.css';
import ClienteForm from './components/ClienteForm';
import ClienteList from './components/ClienteList';

const API_URL = 'http://localhost:8080/clientes';

function App() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditado, setClienteEditado] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(true);

  const carregarClientes = async () => {
    try {
      const resposta = await fetch(API_URL);
      if (!resposta.ok) {
        throw new Error('Não foi possível carregar os clientes.');
      }

      const dados = await resposta.json();
      setClientes(dados);
      setMensagem('');
    } catch (erro) {
      setMensagem(erro.message);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const salvarCliente = async (cliente) => {
    try {
      const metodo = clienteEditado ? 'PUT' : 'POST';
      const url = clienteEditado ? `${API_URL}/${clienteEditado.PersonID}` : API_URL;
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cliente),
      });

      const dados = await resposta.json();
      if (!resposta.ok) {
        throw new Error(dados.error || 'Erro ao salvar cliente.');
      }

      setMensagem(clienteEditado ? 'Cliente atualizado com sucesso.' : 'Cliente cadastrado com sucesso.');
      setClienteEditado(null);
      await carregarClientes();
    } catch (erro) {
      setMensagem(erro.message);
    }
  };

  const excluirCliente = async (id) => {
    if (!window.confirm('Deseja realmente excluir este cliente?')) {
      return;
    }

    try {
      const resposta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || 'Erro ao excluir cliente.');
      }

      setMensagem('Cliente removido com sucesso.');
      if (clienteEditado?.PersonID === id) {
        setClienteEditado(null);
      }
      await carregarClientes();
    } catch (erro) {
      setMensagem(erro.message);
    }
  };

  return (
    <main className="app-shell">
      <section className="card">
        <h1>Cadastro de clientes</h1>
        <p>Gerencie clientes com um formulário simples e uma lista em tempo real.</p>
      </section>

      {mensagem ? <p className="feedback">{mensagem}</p> : null}

      <div className="content-grid">
        <ClienteForm
          onSubmit={salvarCliente}
          clienteEditado={clienteEditado}
          onCancel={() => setClienteEditado(null)}
        />

        <ClienteList
          clientes={clientes}
          carregando={carregando}
          onEdit={setClienteEditado}
          onDelete={excluirCliente}
        />
      </div>
    </main>
  );
}

export default App;
