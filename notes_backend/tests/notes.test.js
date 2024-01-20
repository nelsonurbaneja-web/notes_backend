const supertest = require('supertest')
const { server, app } = require('../index')
const mongoose = require('mongoose')
const Note = require('../models/Note')
const api = supertest(app)

const InitialNote = [
  {
    content: "Iam FullStack JavaScript Developer",
    date: new Date(),
    important: true
  },
  {
    content: "JavaScript is the best lwnguage programmation",
    date: new Date(),
    important: true
  }
]

test('las notas llegan en JSON y en estatus 200', async () => {
  await api
  .get('/api/notas')
  .expect(200)
  .expect('Content-Type', /json/)
})

test('Existen las notas ', async () => {
  const response = await api.get('/api/notas')
  expect(response.body).toHaveLength(InitialNote.length)
})

beforeEach(async () => {
  await Note.deleteMany({})

  for(const note of InitialNote) {
    const newNote = new Note(note)
    await newNote.save()
  }
})

afterAll(() => {
  mongoose.connection.close();
  server.close()
})