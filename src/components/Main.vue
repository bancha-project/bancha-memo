<template lang="pug">
    div
        button(@click="load") load
        input#copy-area.hidden(type="text")
        div
            span ID: ahyaemon
            button(@click="() => { copy('ahyaemon') }") copy
        ul
            li(v-for="value, key in yaml")
                span {{ key }}: {{ value }}
                button copy
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'

    @Component
    export default class Hello extends Vue {

        get yaml() {
            return appStore.yaml
        }

        private load() {
            appStore.loadYamlFromFile()
        }

        private copy(s: string) {
            appStore.copy(s)
        }
    }
</script>

<style>
    .hidden {
        position: absolute;
        top: -200px;
    }
</style>
