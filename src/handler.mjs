import { nanoid } from 'nanoid'
import { notes } from './notes.mjs'

/* ----- addNote ----- */

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload
  const id = nanoid(16)
  const createdAt = new Date().toISOString()
  const updatedAt = createdAt

  const newNote = { title, tags, body, id, createdAt, updatedAt }

  notes.push(newNote)

  const isSucces = notes.filter((note) => note.id === id).length > 0

  if (isSucces) {
    const response = h.response({
      status: 'success',
      message: 'catatan berhasil di tambahkan!',
      data: {
        noteId: id
      }
    })
    response.code(201)
    return response
  }

  const response = h.response({
    status: 'failed',
    message: 'catatan gagal di tambahkan!',
    data: {
      noteId: id
    }
  })
  response.code(500)
  return response
}

/* ----- getAllNote ----- */

const getAllNotes = () => ({
  status: 'success',
  data: {
    notes
  }
})

/* ----- getNoteById ----- */

const getNoteById = (request, h) => {
  const { id } = request.params
  const note = notes.filter((n) => id === n.id)[0]

  if (id !== undefined) {
    return {
      status: 'success',
      data: {
        note
      }
    }
  }

  const response = h.response({
    status: 'failed',
    message: 'note tidak ditemukan!'
  })
  response.code(404)
  return response
}

/* ----- updateNoteById ----- */

const updateNoteById = (request, h) => {
  const { id } = request.params
  const { title, tags, body } = request.payload
  const updatedAt = new Date().toISOString()

  const index = notes.findIndex((note) => id === note.id)

  if (index !== -1) {
    notes[index] = { ...notes[index], title, tags, body, updatedAt }

    const response = h.response({
      status: 'success',
      message: 'note berhasil diperbarui!'
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'failed',
    message: 'note gagal diperbarui!'
  })
  response.code(404)
  return response
}
/* ----- deleteNoteById ----- */

const deleteNoteById = (request, h) => {
  const { id } = request.params

  const index = notes.findIndex((note) => id === note.id)

  if (index !== -1) {
    notes.splice(index, 1)

    const response = h.response({
      status: 'success',
      message: 'note berhasil dihapus!'
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'failed',
    message: 'note gagal dihapus!'
  })
  response.code(404)
  return response
}

export {
  addNoteHandler,
  getAllNotes,
  getNoteById,
  updateNoteById,
  deleteNoteById
}
