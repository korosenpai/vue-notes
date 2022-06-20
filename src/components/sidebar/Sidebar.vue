<template>
  <div class="sidebar translucent-box" v-if="!this.$store.getters.sidebarCollapsed">
    <div class="logo">
      <img class="logo-img" src="@/assets/logo.png" alt="frey's logo">
      <h2>Frey - Notes</h2>
      <img src="@/assets/angle-up.svg" alt="" class="collapsed-sidebar-icon" @click="this.$store.commit('toggleSidebar')">
    </div>

    <NewNoteButton />

    <!-- search bar -->
    <div class="searchbar">
      <img src="@/assets/search-bar-icons/magnifying-glass.svg" alt="" class="dropdown-icon">
      <input v-model="searchQuery" type="text" placeholder="">
      <img src="@/assets/search-bar-icons/xmark.svg" alt="" class="dropdown-icon" @click="searchQuery = ''" style="cursor: pointer">
    </div>

    <!-- notes -->
    <SidebarSmallNotes :filteredNotes="filteredNotes"/>
  </div>

  <SidebarCollapsed v-if="this.$store.getters.sidebarCollapsed" />
</template>

<script>
import NewNoteButton from '@/components/sidebar/NewNoteButton.vue'
import SidebarCollapsed from '@/components/sidebar/SidebarCollapsed.vue'
import SidebarSmallNotes from '@/components/sidebar/SidebarSmallNotes.vue'


export default {
  components: {
    NewNoteButton,
    SidebarCollapsed,
    SidebarSmallNotes
  },

  data() {
    return {
      searchQuery: "",
    }
  },

  computed: {
    notes() {
      return this.$store.getters.notes
    },
    filteredNotes() {
      const query = this.searchQuery.toLowerCase()
      if (this.searchQuery == ""){
          return this.notes
      }
      // deep search (can search for title, body, id, tags)
      return this.notes.filter(note => {
        return Object.values(note).some(word => String(word).toLowerCase().includes(query))
      })
    }
  },

}
</script>

<style scoped lang="scss">

.sidebar {
  height: 100%;
  width: 30%;
  border-radius: 0;
  // padding-top: 30px;

  overflow-y: auto;
  
  margin: 0;
  padding: 0 30px;
}

.logo {
  // background: black;
  margin-top: 20px;
  display: flex;
  align-items: center;
  // flex-wrap: wrap;


  .logo-img {
    margin: 0 15px 0 0;

    width: 24px;
    height: 24px;
  }
  
  h2 { 
    color: white;
  }

  .collapsed-sidebar-icon {
    flex: 1 1 40%;
    width: 40px;
    height: 40px;

    cursor: pointer;
    filter: invert(1);
    transform: rotate(-90deg);
  }
}

.searchbar {  
  width: 90%;
  height: 30px;
  padding: 5px 10px;
  margin: 15px 0;

  background-color: white;
  // border: 2px solid lightgray;
  border-radius: 50px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  font-size: 20px;

  .dropdown-icon {
    width: 24px;
    height: 24px;
  }

  input {
    border: 0;
    outline: 0;

    width: 100%;

    font-size: 20px;
  }
}

</style>