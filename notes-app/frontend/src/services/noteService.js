import api from "./api";

export const getNotes = async () => (await api.get("/notes")).data;
export const getNote = async (id) => (await api.get(`/notes/${id}`)).data;
export const createNote = async (noteData) =>
  (await api.post("/notes", noteData)).data;
export const updateNote = async (id, noteData) =>
  (await api.put(`/notes/${id}`, noteData)).data;
export const deleteNote = async (id) =>
  (await api.delete(`/notes/${id}`)).data;