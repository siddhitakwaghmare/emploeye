import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database
  let employees = [
    { id: "1", name: "John Doe", position: "Software Engineer", department: "Engineering", email: "john@example.com" },
    { id: "2", name: "Jane Smith", position: "Product Manager", department: "Product", email: "jane@example.com" },
  ];

  // API Routes
  app.get("/api/employees", (req, res) => {
    res.json(employees);
  });

  app.post("/api/employees", (req, res) => {
    const newEmployee = { ...req.body, id: Date.now().toString() };
    employees.push(newEmployee);
    res.status(201).json(newEmployee);
  });

  app.delete("/api/employees/:id", (req, res) => {
    const { id } = req.params;
    employees = employees.filter((emp) => emp.id !== id);
    res.status(204).send();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
