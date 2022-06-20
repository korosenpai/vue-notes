<template>
<div class="tags-list">
    <h2 v-for="tag, index in tags" :key="index" class="tags-item">
        <img src="@/assets/circle-xmark.svg" class="x-mark" @click="this.$store.commit('removeTag', index)" alt="buttondelete tag">
        <input type="text" ref="tags" :value="tag" @change="saveTag(index)">
    </h2>
    <h2 class="tags-item add-tag" @click="this.$store.commit('addTag')"> &plus; </h2>
</div>
</template>

<script>
import { getNoteFromId } from '@/functions.js'
export default {
    computed: {
        tags() {
            return getNoteFromId(this.$store, this.$store.getters.selectedNoteId).tags
        }
    },
    methods: {
        saveTag(tagIndex) {
            let newValue = this.$refs.tags[tagIndex].value
            this.$store.commit("saveTag", { tagIndex, newValue })
            
        }
    }

}
</script>

<style scoped lang="scss">


.tags-list {
    display: flex;
    flex-direction: row;
    align-items: center;

    flex-wrap: wrap;
    gap: 10px;

    .tags-item {
        display: flex;
        align-items: center;
        padding: 5px 15px;
        border-radius: 50px;
        background-color: white;
    
        input {
            border: none;
            outline: none;
            width: 4em;
            font-size: 20px;
            font-weight: bold;
        }
    }

    .add-tag {
        cursor: pointer;
    }

}

</style>