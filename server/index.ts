import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware para archivos estáticos
// En Vercel, los archivos estáticos se sirven desde el build de Vite
const staticPath = path.resolve(__dirname, "..", "dist", "public");

app.use(express.static(staticPath));

// API routes (si las hubiera en el futuro)
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Manejo de rutas del cliente (SPA)
app.get("*", (_req, res) => {
  // Intentar servir index.html desde la carpeta de build
  res.sendFile(path.join(staticPath, "index.html"), (err) => {
    if (err) {
      // Fallback para desarrollo o si el archivo no existe aún
      res.status(200).send("Servidor listo. Si ves esto, el frontend aún se está compilando o configurando.");
    }
  });
});

// Para ejecución local (fuera de Vercel)
if (process.env.NODE_ENV !== "production") {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

// Exportar para Vercel
export default app;
