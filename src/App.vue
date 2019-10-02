<template>
  <div id="app">
    <header>
      <h1>bancha-memo</h1>
    </header>
    <Main></Main>
    <footer>
      <hr>
      <small>bancha project</small>
    </footer>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import Main from '@/components/Main.vue'

  @Component({
    components: {
      Main,
    },
  })
  export default class App extends Vue {}
</script>
