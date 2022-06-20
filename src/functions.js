
export function generateId() {
    function addZero(value) {
        value = value.toString()
        if (value.length < 2) { value = "0" + value }
        return value
    }
    
    let today = new Date()
    
    let randNumbers = addZero(Math.floor(Math.random() * 99) + 1) // first two numbers are random
    let minute = addZero(today.getMinutes())
    let seconds = addZero(today.getSeconds())
    
    return randNumbers + minute + seconds
}

export function getNoteFromId(store, id) {
    return store.getters.notes.find(note => note.id == id)
}

// import { app } from '@electron/remote'
import fs from 'fs'
// import pathModule from 'path'
// import storage from 'electron-json-storage'
export function saveToJson(notes, lastOpened, notesJsonPath) {
    // const path = app.getAppPath()
    // const notesJsonPath = "C:/coding/javascript/projects/vue-notes/src/data/notes.json"

    const data = JSON.stringify({"notes": notes, "lastOpened": lastOpened}, null, 4)
    
    console.log("saving to:", notesJsonPath)
    fs.writeFileSync(notesJsonPath, data, function(err) {
        if (err) { console.log(err) }
    })
}