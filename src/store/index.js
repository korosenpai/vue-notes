import { createStore } from 'vuex'

import { generateId, saveToJson } from '@/functions'

import configs from '@/configs.json'

import fs from 'fs'
const notesfileRawData = fs.readFileSync(configs.notesJsonFile)
const notesfile = JSON.parse(notesfileRawData)

export default createStore({
  state: {
    notes: notesfile.notes,
    selectedNoteId: notesfile.lastOpened,
    sidebarCollapsed: false
  },
  getters: {
    notes(state) { return state.notes },
    selectedNoteId(state) { return state.selectedNoteId },
    sidebarCollapsed(state) { return state.sidebarCollapsed },

  },
  mutations: {
    selectNote(state, noteId) {
      console.log(`selected note: ${noteId}`)
      state.selectedNoteId = noteId
    },
    
    createNote(state) {
      
      let id = generateId()
      while (state.notes.find(note => note.id == id)) { // check if if is not already taken
        id = generateId()
      }
      
      state.notes.unshift({ id, "lastUpdated": new Date().toISOString() })

      state.selectedNoteId = id //select note
      console.log(`created note: ${id}`)

      saveToJson(state.notes, state.selectedNoteId, configs.notesJsonFile)
    },

    saveNote(state, {id, title, body}) {
      let noteToSave = state.notes.find(note => note.id == id)
      noteToSave.lastUpdated = new Date().toISOString()
      noteToSave.title = title
      noteToSave.body = body

      saveToJson(state.notes, state.selectedNoteId, configs.notesJsonFile)
    },
    
    removeNote(state, noteId) {
      // remove note with note id and save to json
      if (!confirm("delete note?")) { return }
      console.log("removing note", noteId)
      state.notes = state.notes.filter(note => note.id != noteId)
      state.selectedNoteId = state.notes[0].id
      console.log(state.selectedNoteId)
      console.log(state.notes)

      saveToJson(state.notes, state.selectedNoteId, configs.notesJsonFile)
    },


    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
    },


    addTag(state) {
      // create empty tag
      let noteToSave = state.notes.find(note => note.id == state.selectedNoteId)
      if (!noteToSave.tags) { noteToSave.tags = [] } // create tags array if not present

      noteToSave.tags.push("")
    },

    saveTag(state, { tagIndex, newValue }) {
      console.log(`note: ${state.selectedNoteId} updated tag of index ${tagIndex}: ${newValue}`)
      state.notes.find(note => note.id == state.selectedNoteId).tags.splice(tagIndex, 1, newValue)

      saveToJson(state.notes, state.selectedNoteId, configs.notesJsonFile)
    },

    removeTag(state, tagIndex) {
      // remove from active id note
      console.log(`note: ${state.selectedNoteId} removed tag of index ${tagIndex}`)
      state.notes.find(note => note.id == state.selectedNoteId).tags.splice(tagIndex, 1)
      
      saveToJson(state.notes, state.selectedNoteId, configs.notesJsonFile)
    }
  },
  actions: {
  },
  modules: {
  }
})
