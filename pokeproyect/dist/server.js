"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sqlite3_1 = __importDefault(require("sqlite3"));
// Configurar express
const app = (0, express_1.default)();
const PORT = 4000;
// Permitir solicitudes desde el frontend
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Configuración de la base de datos SQLite
const db = new sqlite3_1.default.Database('./pokemon.db', (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    }
    else {
        console.log('Conexión con SQLite establecida.');
        // Crear la tabla de Pokémon si no existe
        db.run(`CREATE TABLE IF NOT EXISTS pokemon (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        image TEXT,
        type TEXT
      )`);
    }
});
// Ruta para capturar un Pokémon (POST)
app.post('/api/catch', (req, res) => {
    const { name, image, type } = req.body;
    db.run(`INSERT INTO pokemon (name, image, type) VALUES (?, ?, ?)`, [name, image, type], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Pokémon capturado!' });
    });
});
// Ruta para obtener los Pokémon capturados (GET)
app.get('/api/pokemon', (req, res) => {
    db.all(`SELECT * FROM pokemon`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});
// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
