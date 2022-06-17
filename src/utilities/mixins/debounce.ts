import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      timeout: '' as unknown,
    }
  },
  methods: {
    debounce(func: () => void, wait = 1000) {
      clearTimeout(this.timeout as ReturnType<typeof setTimeout>)
      this.timeout = setTimeout(func, wait)
    },
  },
})
