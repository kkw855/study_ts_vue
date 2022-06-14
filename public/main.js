const template = `
<div>
  <h1>{{title}}</h1>
</div>`

const data = () => {
  return {
    title: 'Vue3 Tutorial',
  }
}

const App = { data, template }

Vue.createApp(App).mount('.vue-app')
