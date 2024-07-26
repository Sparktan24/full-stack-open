let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true,
  },
];
const express = require('express');
const app = express();

app.use(express.json());

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    });
  }

  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  };

  notes = notes.concat(note);
  //console.log(note);
  //console.log(request.headers);
  response.json(note);
});

//Define un controlador de eventos, que se utiliza para manejar las solicitudes HTTP GET realizadas a la raíz / de la aplicación
app.get('/', (request, response) => {
  response.send('<h1>Hello World!!</h1>');
});
// La segunda ruta define un controlador de eventos, que maneja las solicitudes HTTP GET realizadas a la ruta notes de la aplicación
app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = +request.params.id;
  const note = notes.find((note) => note.id === id);
  note ? response.json(note) : response.status(404).end();
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
