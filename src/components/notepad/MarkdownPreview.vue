<template>
    <div v-html="markdownToHtml" class="markdown-preview"></div>
</template>

<script setup>
// import vueMarkdown from 'vue-markdown'
import { computed } from '@vue/runtime-core'
import { marked } from 'marked'

const props = defineProps({
    notesBody: {
        type: String,
        default: ""
    }
})

const markdownToHtml = computed(() => {
    return marked(props.notesBody)
})

</script>

<style scoped lang="scss">
.markdown-preview {
    overflow: auto;
    text-align: left;
    padding-left: 5%;

}

</style>