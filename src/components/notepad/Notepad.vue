<template>
<div class="notepad">
    <div class="title">
        <input type="text" v-model="notesTitle" class="notes-title" placeholder="New Note" @change="saveNote()">
        <div class="separator"></div>
    </div>
    
    <!-- <Splitpanes class="notes-body">
        <pane>
            <textarea  v-model="notesBody" placeholder="Start writing..." @change="saveNote()"></textarea>
        </pane>
        <pane class="markdown-preview" v-if="MarkdownPreviewIsActive"> {{ notesBody }} </pane>
    </Splitpanes> -->
    <!-- <multipane>
        <textarea  v-model="notesBody" placeholder="Start writing..." @change="saveNote()"></textarea>
        <multipane-resizer></multipane-resizer>
        <div class="markdown-preview" v-if="MarkdownPreviewIsActive"> {{ notesBody }} </div>
    </multipane> -->

    <!-- TODO use teleport to define only once -->
    <textarea class="notes-body" v-if="!MarkdownPreviewIsActive" v-model="notesBody" placeholder="Start writing..." @change="saveNote()"></textarea>

    <VueSplitView
        direction="horizontal"
        a-init="50%"
        a-min="50px"
        a-max="70%" 
        class="notes-body"
        v-if="MarkdownPreviewIsActive"
    >

        <template #A id="split-view-notepad-panel">
            <textarea  v-model="notesBody" placeholder="Start writing..." @change="saveNote()"></textarea>
        </template>

        <template #B>
            <MarkdownPreview v-if="MarkdownPreviewIsActive" :notesBody="notesBody" />
        </template>
    </VueSplitView>

    <Tags />
</div>
</template>

<script>
import { getNoteFromId } from '@/functions.js'
import Tags from '@/components/notepad/Tags.vue'
import MarkdownPreview from '@/components/notepad/MarkdownPreview.vue'

import VueSplitView from 'vue-split-view'
import 'vue-split-view/dist/vue3.esm.js'

export default {
    components: {
        Tags,
        MarkdownPreview,
        
        VueSplitView

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
            return getNoteFromId(this.$store, this.$store.getters.selectedNoteId).tags ?? []
        },
        MarkdownPreviewIsActive() {
            // only return true if sidebar is collapsed and "nomd" is not in tags
            return this.$store.getters.sidebarCollapsed && !this.tags.includes("nomd")
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
    margin: 30px 0 15px 0;

    border-radius: 14px;

    background-color: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(23px);


    color: white;
    font-size: 24px;

    resize: none;

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;

    textarea {
        height: 95%;
        width: 100%;
        overflow: auto;
        margin: 0;
        padding: 0;
        // padding: 15px 30px;
        background-color: rgba($color: #000000, $alpha: 0);
        backdrop-filter: none;
        border: none;
        outline: none;
        resize: none;
        font-size: 24px;

        color: white;

        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;

        &::placeholder {
        color: white;
        opacity: 1;  // Firefox 
        }        
        
    }

    &::placeholder {
        color: white;
        opacity: 1;  // Firefox 
    }

    &--vertical > &__splitter {
        min-width: 7px;
        background: linear-gradient(90deg, #ccc, #111);
    }
}


</style>