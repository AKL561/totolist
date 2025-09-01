// api/todos.js
module.exports = (req, res) => {
  const todos = [
    { id: 1, text: "Faire les courses", created_at: "2025-08-30", is_complete: false, Tags: ["maison"] },
    { id: 2, text: "Réviser le projet", created_at: "2025-08-30", is_complete: false, Tags: ["école"] },
    { id: 3, text: "Aller courir", created_at: "2025-08-31", is_complete: true,  Tags: [] },
    { id: 4, text: "Lire 20 pages", created_at: "2025-08-31", is_complete: false, Tags: ["habitude"] },
    { id: 5, text: "Appeler le médecin", created_at: "2025-09-01", is_complete: false, Tags: [] },
    { id: 6, text: "Préparer le CV", created_at: "2025-09-01", is_complete: false, Tags: ["pro"] },
    { id: 7, text: "Nettoyer la cuisine", created_at: "2025-09-01", is_complete: false, Tags: ["maison"] },
  ];

  // GET = renvoie la liste
  if (req.method === "GET") return res.status(200).json(todos);

  // POST = ajoute (mock simple)
  if (req.method === "POST") {
    const body = req.body || {};
    const nextId = todos.length ? Math.max(...todos.map(t => t.id)) + 1 : 1;
    const created = {
      id: nextId,
      text: body.text ?? "",
      created_at: body.created_at ?? new Date().toISOString().split("T")[0],
      is_complete: !!body.is_complete,
      Tags: Array.isArray(body.Tags) ? body.Tags : [],
    };
    todos.push(created);
    return res.status(201).json(created);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end("Method Not Allowed");
};