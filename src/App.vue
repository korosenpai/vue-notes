<template>
  <Sidebar />
  <Notepad />
  
</template>

<script>
import Sidebar from '@/components/sidebar/Sidebar.vue'
import Notepad from '@/components/notepad/Notepad.vue'

export default {
  components: { Sidebar, Notepad }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // color: #2c3e50;

  display: flex;
  flex-direction: row;
  height: 100%;
}


</style>
