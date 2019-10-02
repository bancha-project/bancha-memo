<template>
  <div class="home">
    <ul>
      <li v-for="value, key in yaml">
        {{ key }}, {{ value }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator'
  import fs from 'fs'
  import jsYaml from 'js-yaml'

  @Component
  export default class Home extends Vue {
    private yaml = {}

    private mounted() {
      const txt = fs.readFileSync('memo.yml', 'utf8')
      this.yaml = jsYaml.safeLoad(txt)
    }
  }
</script>
