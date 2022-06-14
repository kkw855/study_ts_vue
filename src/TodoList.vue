<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import { pipe, flow } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import * as E from 'fp-ts/Either'
import TreeItem from './components/TreeItem.vue'

const state = reactive({
  checked: [] as Array<string>,
})

const todos = [
  'Set up nuxt.config.js',
  'Create Pages',
  'Create Menu and explain what Nuxt Layouts do',
  'Create Masthead, Index page',
  'Create a grid from store data',
  'Exercise: Create footer, create restaurants page',
  'Bring things in via API, via Vuex store and a Plugin',
  'Deploy! And set up environment variables',
  'Filter the grid with a reusable component and computed properties',
  'Create a dynamic page',
  'Exercise: put the content into the dynamic page',
  'Create a reusable toast component with a slot',
  'Create a cart page, use Vuex store mutations',
  'Make use of uuid',
  'Create an SVG icon with conditional layout',
  'Exercise: Finish the cart, add a counter to the cart link in menu',
  'Review validation',
]

// TODO: JSON.parse 가 any 를 리턴한다.
const load = flow(
  (key: string) => localStorage.getItem(key),
  O.fromNullable,
  O.chainEitherK((v) =>
    E.tryCatch(
      () => JSON.parse(v),
      (e) => e
    )
  ),
  O.getOrElse(() => [])
)

onMounted(() => {
  state.checked = load('checked')
  console.log(state.checked)
})

watch(
  () => state.checked,
  (checked) => console.log(checked)
)
</script>

<template>
  <fieldset>
    <legend>What we're building</legend>
    <div v-for="todo in todos" :key="todo">
      <input
        :id="todo"
        name="todo"
        :value="todo"
        v-model="state.checked"
        type="checkbox"
      />
      <label :for="todo">{{ todo }}</label>
    </div>
  </fieldset>
  <TreeItem label="라벨" description="설명" />
</template>

<style scoped></style>
