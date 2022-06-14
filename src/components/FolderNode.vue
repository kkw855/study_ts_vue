<script setup lang="ts">
import FileNode from './FileNode.vue'

interface TreeItem {
  label: string
  type: 'folder' | 'file'
  description: string
  children: Array<TreeItem>
}

defineProps<{ item: TreeItem }>()
</script>

<template>
  <ul class="container">
    폴
    {{
      item.label
    }}
    <li v-for="i in item.children">
      <FileNode
        v-if="i.type === 'file'"
        :label="i.label"
        :description="i.description"
      />
      <FolderNode v-else :item="i" />
    </li>
  </ul>
</template>

<style scoped>
.container {
  margin-left: 5px;
}
</style>
