<template lang="pug">
    div
        button(@click="load")
            font-awesome-icon(icon="folder-open" size="3x")
        button
            font-awesome-icon(icon="file" size="3x")
        button(@click="load") load
        input#copy-area.hidden(type="text")
        ul
           li(v-for="value, key in yaml")
                span {{ key }}: {{ value }}
                button(@click="() => { copy(value) }") copy
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
