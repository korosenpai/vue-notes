<template>
<ul class="notes-list">
    <li class="notes-list-item" v-for="note in filteredNotes" :key="note.id" @click="store.commit('selectNote', note.id)" @dblclick="store.commit('removeNote', note.id)" :class="{'notes-list-item-selected': note.id == store.getters.selectedNoteId}">
          <div class="notes-small-title" v-if="note.title">
              <h2>
              {{ note.title.substring(0, MAX_SMALL_NOTE_TITLE_LENGTH) }}
              {{ note.title.length > MAX_SMALL_NOTE_TITLE_LENGTH ? '...' : '' }}
              </h2>
          </div>
          <div v-else> <h2>New Note</h2> </div>
        
        <div class="notes-small-body" v-if="note.body">
            <!-- {{ note.body }} -->
            {{ note.body.substring(0, MAX_SMALL_NOTE_BODY_LENGTH) }}
            {{ note.body.length > MAX_SMALL_NOTE_BODY_LENGTH ? '...': '' }}
        </div>
        <div v-else> Start writing... </div>

        <div class="notes-small-lastupdated" v-if="note.lastUpdated"> {{ new Date(note.lastUpdated).toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" }) }} </div>
    </li>
</ul>
</template>

<script>
import { useStore } from 'vuex'

export default {
    props: {
        filteredNotes: {
            type: Object, // list
            required: true
        }
    },

    setup() {
        const store = useStore()

        const MAX_SMALL_NOTE_TITLE_LENGTH = 30
        const MAX_SMALL_NOTE_BODY_LENGTH = 60

        return {
            store,
            MAX_SMALL_NOTE_TITLE_LENGTH,
            MAX_SMALL_NOTE_BODY_LENGTH
        }
    }

}
</script>

<style scoped lang="scss">

.notes-list {
  width: 90%;
  padding: 5px 10px;
  // padding: 5px 10px;
  // overflow-y: auto;
  // height: 75%;
  list-style-type: none;

  .notes-list-item {
    padding: 10px;
    margin: 0 0 14px 0;

    cursor: pointer;
    background-color: white;
    border-radius: 14px;
    text-align: left;

    &:hover {
      backdrop-filter: blur(23px);
      transform: scale(1.01);
    }
  }

  .notes-list-item-selected {
    position: relative;
    // needed for ::after position absolute

    &::after {
      content: "";
      border-radius: 14px;

      height: 110%;
      width: 5px;
      background: #FBBFA2;
      
      // position
      position: absolute;
      transform: translateX(-30px);
      top: -5%;
    }
  }

  .notes-small-title,
  .notes-small-lastupdated {
    padding: 10px;
  }

  .notes-small-lastupdated {
    color: #aaaaaa;
    font-style: italic;
    text-align: right;
  }

}
</style>