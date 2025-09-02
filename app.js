// --- Imports
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// --- App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// --- Swagger (conservé, mais sans casser Vercel)
const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: { title: 'Todo List API (Learning campus)', version: '1.0.0' },
  },
  // On pointe sur CE fichier
  apis: [__filename],
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- Données (inchangées)
const todos = [
  {
    todolist: [
      { id: 1, text: 'Learn about Polymer', created_at: 'Mon Apr 26 06:01:55 +0000 2015', Tags: ['Web Development', 'Web Components'], is_complete: true },
      { id: 2, text: 'Watch Pluralsight course on Docker', created_at: 'Tue Mar 02 07:01:55 +0000 2015', Tags: ['Devops', 'Docker'], is_complete: true },
      { id: 3, text: 'Complete presentation prep for Aurelia presentation', created_at: 'Wed Mar 05 10:01:55 +0000 2015', Tags: ['Presentation', 'Aureia'], is_complete: false },
      { id: 4, text: 'Instrument creation of development environment with Puppet', created_at: 'Fri June 30 13:00:00 +0000 2015', Tags: ['Devops', 'Puppet'], is_complete: false },
      { id: 5, text: 'Transition code base to ES6', created_at: 'Mon Aug 01 10:00:00 +0000 2015', Tags: ['ES6', 'Web Development'], is_complete: false },
      { id: 6, text: 'Daploy website', created_at: 'Mon Aug 01 10:00:00 +0000 2015', Tags: ['ES6', 'Web Development'], is_complete: false },
      { id: 7, text: 'Make all testing', created_at: 'Mon Aug 01 10:00:00 +0000 2015', Tags: ['ES6', 'Web Development'], is_complete: false },
      { id: 8, text: 'Send messages to run Team', created_at: 'Mon Aug 01 10:00:00 +0000 2015', Tags: ['ES6', 'Web Development'], is_complete: false },
      { id: 9, text: 'Close Project', created_at: 'Mon Aug 01 10:00:00 +0000 2015', Tags: ['ES6', 'Web Development'], is_complete: false },
    ],
  },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       required: [id, text, created_at, Tags, is_complete]
 *       properties:
 *         id: { type: integer }
 *         text: { type: string }
 *         created_at: { type: string, format: date-time }
 *         Tags: { type: array, items: { type: string } }
 *         is_complete: { type: boolean }
 */

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Returns all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 */
app.get('/todos', (_req, res) => {
  res.status(200).json(todos);
});

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Creates a new todo
 *     tags: [Todos]
 */
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos[0].todolist.length + 1,
    text: req.body.text,
    created_at: new Date().toISOString(),
    Tags: req.body.Tags || [],
    is_complete: !!req.body.is_complete,
  };
  todos[0].todolist.push(newTodo);
  res.status(201).json(newTodo);
});

/**
 * @swagger
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by id
 *     tags: [Todos]
 */
app.get('/todos/:id', (req, res) => {
  const todo = todos[0].todolist.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).send('Todo not found');
  res.json(todo);
});

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 */
app.put('/todos/:id', (req, res) => {
  const idx = todos[0].todolist.findIndex(t => t.id === Number(req.params.id));
  if (idx < 0) return res.status(404).send('Todo not found');
  todos[0].todolist[idx] = { ...todos[0].todolist[idx], ...req.body };
  res.json(todos[0].todolist[idx]);
});

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 */
app.delete('/todos/:id', (req, res) => {
  const idx = todos[0].todolist.findIndex(t => t.id === Number(req.params.id));
  if (idx < 0) return res.status(404).send('Todo not found');
  todos[0].todolist.splice(idx, 1);
  res.send('Todo deleted successfully');
});

// Healthcheck (pour tester vite sur Vercel)
app.get('/health', (_req, res) => res.json({ ok: true }));

// *** Important pour Vercel: pas de app.listen ici ***
module.exports = app;

