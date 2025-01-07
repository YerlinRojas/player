const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");  // Importa cors
const app = express();
const PORT = 5000;

app.use(cors());  // Habilita CORS en todas las rutas
app.use(express.json());
app.use(bodyParser.json());

const dbPath = "./server/db.json";

// Ruta para obtener los videos
app.get("/api/videos", (req, res) => {
  fs.readFile("./server/db.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }
    res.json(JSON.parse(data));
  });
});

// Ruta para agregar un nuevo video
app.post("/api/videos", (req, res) => {
  const nuevoVideo = req.body;

  fs.readFile("./server/db.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer el archivo" });
    }

    const videos = JSON.parse(data);
    videos.push(nuevoVideo);

    fs.writeFile("./server/db.json", JSON.stringify(videos, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al escribir en el archivo" });
      }

      res.status(201).json(nuevoVideo);
    });
  });
});


// Ruta para actualizar un video
app.put("/api/videos/:id", (req, res) => {
  const { id } = req.params;
  const { titulo, capa } = req.body;

  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error al leer la base de datos" });
    }

    // Parsear la base de datos
    const db = JSON.parse(data);
    const videos = db.videos;

    // Buscar el índice del video
    const videoIndex = videos.findIndex((video) => video.id === Number(id));
    if (videoIndex === -1) {
      return res.status(404).json({ error: "Video no encontrado" });
    }

    // Actualizar el video
    videos[videoIndex] = { ...videos[videoIndex], titulo, capa };

    // Escribir los cambios en la base de datos
    fs.writeFile(dbPath, JSON.stringify(db, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar los cambios" });
      }
      res.json(videos[videoIndex]); // Devolver el video actualizado
    });
  });
});





app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
