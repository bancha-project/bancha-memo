<template lang="pug">
    div
        button(@click="load") load
        ul
            li(v-for="value, key in yaml") {{ key }}: {{ value }}
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import fs from 'fs'
    import jsYaml from 'js-yaml'
    import { appStore } from '@/store'

    @Component
    export default class Hello extends Vue {

        get yaml() {
            return appStore.yaml
        }

        private load() {
            appStore.loadYamlFromFile()
        }
    }
</script>
