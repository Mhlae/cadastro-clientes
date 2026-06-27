const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./clients.db');

db.run(`
  CREATE TABLE IF NOT EXISTS Persons (
    PersonID INTEGER PRIMARY KEY AUTOINCREMENT,
    Name TEXT NOT NULL,
    Email TEXT,
    Phone TEXT
  )
`);

app.get('/', (req, res) => {
  res.json({
    message: 'API de clientes funcionando.',
    routes: ['/clientes']
  });
});

app.get('/clientes', (req, res) => {
  db.all('SELECT * FROM Persons ORDER BY PersonID DESC', [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao listar clientes.' });
    }

    res.json(rows);
  });
});

app.post('/clientes', (req, res) => {
  const { Name, Email, Phone } = req.body;

  if (!Name || typeof Name !== 'string' || Name.trim() === '') {
    return res.status(400).json({ error: 'O nome é obrigatório.' });
  }

  const sql = 'INSERT INTO Persons (Name, Email, Phone) VALUES (?, ?, ?)';
  const values = [Name.trim(), Email?.trim() || '', Phone?.trim() || ''];

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
    }

    res.status(201).json({ PersonID: this.lastID, Name, Email, Phone });
  });
});

app.put('/clientes/:id', (req, res) => {
  const id = Number(req.params.id);
  const { Name, Email, Phone } = req.body;

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  if (!Name || typeof Name !== 'string' || Name.trim() === '') {
    return res.status(400).json({ error: 'O nome é obrigatório.' });
  }

  const sql = 'UPDATE Persons SET Name = ?, Email = ?, Phone = ? WHERE PersonID = ?';
  const values = [Name.trim(), Email?.trim() || '', Phone?.trim() || '', id];

  db.run(sql, values, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao atualizar cliente.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.json({ PersonID: id, Name, Email, Phone });
  });
});

app.delete('/clientes/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  db.run('DELETE FROM Persons WHERE PersonID = ?', [id], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Erro ao deletar cliente.' });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.json({ message: 'Cliente removido com sucesso.' });
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Erro interno do servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});