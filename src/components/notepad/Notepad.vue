<template>
<div class="notepad">
    <div class="title">
        <input type="text" v-model="notesTitle" class="notes-title" placeholder="New Note" @change="saveNote()">
        <div class="separator"></div>
    </div>
    <textarea class="notes-body" v-model="notesBody" placeholder="Start writing..." @change="saveNote()"></textarea>

    <Tags />
</div>
</template>

<script>
import Tags from '@/components/notepad/Tags.vue'
import { getNoteFromId } from '@/functions.js'

export default {
    components: {
        Tags
    },

    data() {
        return {
            notesTitle: getNoteFromId(this.$store, this.$store.getters.selectedNoteId).title,
            notesBody: getNoteFromId(this.$store, this.$store.getters.selectedNoteId).body,
        }
    },

    computed: {
        selectedNoteId() {
            return this.$store.getters.selectedNoteId
        },
        tags() {
            return getNoteFromId(this.$store, this.$store.getters.selectedNoteId).tags
        }
    },

    methods: {
        saveNote() {
            this.$store.commit("saveNote", { id: this.selectedNoteId, title: this.notesTitle, body: this.notesBody})
        }
    },

    watch: {
        selectedNoteId(newValue, oldValue) {
            this.notesTitle = getNoteFromId(this.$store, newValue).title
            this.notesBody = getNoteFromId(this.$store, newValue).body
        }
    }
}
</script>

<style lang="scss">
.separator {
  width: 40%;
  height: 5px;
  
  border-radius: 14px;
  background-color: white;
}

.notepad {
    padding: 30px;
    width: 100%;
    // display: border-box;
}

.title {
    margin-left: 60px;
}

.notes-title,
.notes-body {
    border: none;
    outline: none;

    width: 100%;
}

.notes-title {
    background: transparent;
    font-size: 3em;
    font-weight: bold;
    color: white;

    &::placeholder {
        color: white;
        opacity: 1;  // Firefox 
    }
}

.notes-body {
    width: 100%;
    height: 70%;

    padding: 15px 30px;
    margin: 30px 0 0 0;

    border-radius: 14px;

    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(23px);


    color: white;
    font-size: 24px;

    resize: none;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    &::placeholder {
        color: white;
        opacity: 1;  // Firefox 
    }
}


</style>