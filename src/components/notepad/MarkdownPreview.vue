<template>
    <div v-html="markdownToHtml"></div>
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
}

</style>