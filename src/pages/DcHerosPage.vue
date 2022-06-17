<template>
  <div class="m-auto">
    <h1 class="text-2xl text-center">Dc Heros {{ herosCount }}</h1>
    <ul>
      <li
        v-for="(hero, index) in dcHeros"
        :key="hero.name"
        class="flex justify-between"
      >
        <div>{{ hero.name }}</div>
        <button @click="removeHero(index)">x</button>
      </li>
    </ul>
    <form class="mt-10" @submit.prevent="addHero($data.dcHeros, $data.newHero)">
      <input
        v-model="newHero"
        class="border rounded"
        placeholder="Type Hero Name Here"
      />
      <button
        class="border rounded bg-gradient-to-r from-red-700 to-pink-500 text-white"
        type="submit"
      >
        Add Hero
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import * as Array from 'fp-ts/Array'
import { pipe } from 'fp-ts/function'
import * as O from 'fp-ts/Option'
import { not } from 'fp-ts/Predicate'
import * as S from 'fp-ts/string'
import { gt } from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import { defineComponent } from 'vue'

function add(heros: Array<{ name: string }>) {
  return (newHero: string) => [...heros, { name: newHero }]
}

export default defineComponent({
  data() {
    return {
      newHero: '',
      fname: 'Sarthak',
      lname: 'Shrivastava',
      dcHeros: [
        { name: 'SuperGirl2' },
        { name: 'Flash' },
        { name: 'Batman' },
        { name: 'Arrow' },
        { name: 'Superman' },
      ],
    }
  },
  computed: {
    herosCount(): number {
      return this.dcHeros.length
    },
  },
  methods: {
    addHero(heros: Array<{ name: string }>, newHero: string) {
      this.dcHeros = pipe(
        newHero,
        O.fromPredicate(not(S.isEmpty)),
        O.map(add(heros)),
        O.getOrElse(() => heros)
      )
      this.newHero = ''
    },
    removeHero(index: number) {
      console.log(gt(N.Ord)(1, 2))
      console.log(gt(N.Ord)(2, 1))
      this.dcHeros = Array.filterWithIndex((idx: number) => idx != index)(
        this.dcHeros
      )
    },
  },
})
</script>
