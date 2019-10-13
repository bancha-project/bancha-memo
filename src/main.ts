import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFolderOpen,
  faCopy,
  faFilter,
  faExternalLinkAlt,
  faPlusCircle,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faFolderOpen, faCopy, faFilter, faExternalLinkAlt, faPlusCircle, faTimesCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')

Vue.directive('focus', {
  inserted: (el: HTMLElement) => {
    const input = el as HTMLInputElement
    input.focus()
    input.select()
  },
})
