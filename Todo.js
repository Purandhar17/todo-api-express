const express = require("express");
const app = express();
app.use(express.json());
let todos = [
  { id: 1, task: "Learn Express", done: false },
  { id: 2, task: "Practice Node.js", done: true },
];
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
app.get("/todos", (req, res) => {
  res.json(todos);
});
app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});
app.post("/todos", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });

  const newTodo = {
    id: todos.length + 1,
    task,
    done: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});
app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const { task, done } = req.body;
  if (task !== undefined) todo.task = task;
  if (done !== undefined) todo.done = done;

  res.json(todo);
});
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ message: `Todo ${id} deleted` });
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: "Something broke!" });
});
app.listen(3000, () => {
  console.log("Todo API running on http://localhost:3000");
});
