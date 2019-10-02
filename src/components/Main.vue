<template lang="pug">
    div
        p {{ count }}
        button(@click="increment") increment
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
        private yaml = {}

        private increment() {
            appStore.increment()
        }

        get count() {
            return appStore.count
        }

        private load() {
            const dialog = require('electron').remote.dialog
            const filepaths = dialog.showOpenDialogSync({
                properties: ['openFile'],
                title: 'Select a text file',
                defaultPath: '.',

            })
            const txt = fs.readFileSync(filepaths![0], 'utf8')
            this.yaml = jsYaml.safeLoad(txt)
        }
    }
</script>
