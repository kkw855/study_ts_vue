<template>
  <h1>Dc Heros {{ herosCount }}</h1>
  <p>{{ randC }}</p>
  <p>{{ randC }}</p>
  <p>{{ randC }}</p>
  <p>{{ randD() }}</p>
  <p>{{ randD() }}</p>
  <p>{{ randD() }}</p>
  <ul>
    <li v-for="(hero, index) in dcHeros" :key="index">
      {{ hero.name }}
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
import * as S from 'fp-ts/string'
import * as O from 'fp-ts/Option'

function add(heros: Array<{ name: string }>) {
  return (newHero: string) => [...heros, { name: newHero }]
}

export default defineComponent({
  computed: {
    herosCount(): number {
      return this.dcHeros.length
    },
    randC() {
      this.newHero
      return Math.random()
    },
  },
  methods: {
    addHero(heros: Array<{ name: string }>, newHero: string) {
      // TODO
      this.dcHeros = pipe(
        newHero,
        O.fromPredicate(not(S.isEmpty)),
        O.map(add(heros)),
        O.getOrElse(() => heros)
      )
      //console.log(heros, newHero)
      this.newHero = ''
      // return (newHero: string) => {
      //
      // }
      //this.dcHeros = [...this.dcHeros, {name: this.newHero}]
      //this.newHero = ''
    },
    randD() {
      return Math.random()
    },
  },
  data() {
    return {
      newHero: '',
      dcHeros: [
        { name: 'SuperGirl2' },
        { name: 'Flash' },
        { name: 'Batman' },
        { name: 'Arrow' },
        { name: 'Superman' },
      ],
    }
  },
})
</script>
