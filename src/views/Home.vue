<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import HelloWorld from '@/components/HelloWorld.vue'
  import fs from 'fs'
  import jsYaml from 'js-yaml'

  @Component({
    components: {
      HelloWorld,
    },
  })
  export default class Home extends Vue {
    private mounted() {
      const txt = fs.readFileSync('memo.yml', 'utf8')
      const yaml = jsYaml.safeLoad(txt)
      console.log(yaml)
    }
  }
</script>
