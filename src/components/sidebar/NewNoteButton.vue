<template>
    <div class="new-note-button" @click="createNote()">
      <h2> New Note </h2>
    </div>
</template>

<script>
export default {
    methods: {
        createNote() {
            this.$store.commit("createNote")
        }
    }
}
</script>

<style scoped lang="scss">
.new-note-button {
  width: 90%;
  padding: 10px;
  
  cursor: pointer;
  border-radius: 14px;
  background-color: #FBBFA2;
  margin-top: 20px;

}
</style>