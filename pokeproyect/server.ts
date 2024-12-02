import express, { Request, Response } from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';


const app = express();
const PORT = 4000;


app.use(cors());
app.use(express.json());


const db = new sqlite3.Database('./pokemon.db', (err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
  } else {
    console.log('Conexión con SQLite establecida.');
    // Crear la tabla de Pokémon si no existe
    db.run(
      `CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        type TEXT
      )`
    );
  }
});

// Ruta para capturar un Pokémon (POST)
app.post('/api/catch', (req: Request, res: Response) => {
  const { name, image, type } = req.body;

  db.run(
    `INSERT INTO pokemon (name, image, type) VALUES (?, ?, ?)`,
    [name, image, type],
    (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ message: 'Pokémon capturado!' });
    }
  );
});

// Ruta para obtener los Pokémon capturados (GET)
app.get('/api/pokemon', (req: Request, res: Response) => {
  db.all(`SELECT * FROM pokemon`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});