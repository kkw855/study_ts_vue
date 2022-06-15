<template>
  <h1 class="text-3xl text-center">Dc Heros {{ herosCount }}</h1>
  <ul>
    <li v-for="(hero, index) in dcHeros" :key="hero.name">
      <div>{{ hero.name }} <button @click="removeHero(index)">x</button></div>
      <input />
    </li>
  </ul>
  <form @submit.prevent="addHero($data.dcHeros, $data.newHero)">
    <input v-model="newHero" placeholder="Type Hero Name Here" />
    <button type="submit">Add Hero</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { pipe } from 'fp-ts/function'
import { not } from 'fp-ts/Predicate'
import { gt } from 'fp-ts/Ord'
import * as N from 'fp-ts/number'
import * as S from 'fp-ts/string'
import * as O from 'fp-ts/Option'
import * as Array from 'fp-ts/Array'

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
      // const gt1 = (heroLength: number) => (index: number) =>
      //   gt(N.Ord)(heroLength, index)
      // pipe(
      //   index,
      //   O.fromPredicate(gt1(this.dcHeros.length)),
      //   O.map(
      //
      //   )
      // )
    },
  },
})
</script>
