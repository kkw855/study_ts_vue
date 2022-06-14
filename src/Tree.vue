<script setup lang="ts">
import FolderNode from './components/FolderNode.vue'

interface TreeItem {
  label: string
  type: 'folder' | 'file'
  description: string
  children: Array<TreeItem>
}

const items = [
  {
    label: 'Categories',
    type: 'folder',
    description:
      'This identifies the different classes of objects in the data model',
    children: [
      {
        label: 'movies',
        type: 'folder',
        description: 'Recipients of medical care services.',
        children: [],
      },
      {
        label: 'musics',
        type: 'folder',
        description: 'Recipients of medical care services.',
        children: [],
      },
      {
        label: 'Health Insurance BSHI1',
        type: 'file',
        description: '',
        children: [],
      },
    ],
  },
]
</script>

<template>
  <div v-for="item in items">
    <FolderNode :item="item" />
  </div>
</template>

<style scoped></style>
