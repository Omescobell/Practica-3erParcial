import express from "express";
import cors from "cors";
import connection from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());


// CREAR (POST)
app.post("/api/alumnos", (req, res) => {
  const { nombre, edad, curso } = req.body;

  const sql = "INSERT INTO alumnos(nombre, edad, curso) VALUES (?, ?, ?)";
  connection.query(sql, [nombre, edad, curso], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ mensaje: "Alumno agregado", id: result.insertId });
  });
});


// MODIFICAR (PUT)
app.put("/api/alumnos/:id", (req, res) => {
  const id = req.params.id;
  const { nombre, edad, curso } = req.body;

  const sql = "UPDATE alumnos SET nombre=?, edad=?, curso=? WHERE id=?";
  connection.query(sql, [nombre, edad, curso, id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ mensaje: "Alumno modificado" });
  });
});


// ELIMINAR (DELETE)
app.delete("/api/alumnos/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM alumnos WHERE id=?";
  connection.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ mensaje: "Alumno eliminado" });
  });
});


// LISTAR (GET)
app.get("/api/alumnos", (req, res) => {
  connection.query("SELECT * FROM alumnos", (err, result) => {
    if (err) return res.status(500).json({ error: err });

    res.json(result);
  });
});


// Servir archivos estáticos si los ocupas
app.use(express.static("public"));


// PUERTO
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
