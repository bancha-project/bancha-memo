<template lang="pug">
    header.hero.is-dark
        .hero-body
            .container
                h1.title
                    span bancha memo
                    font-awesome-icon.hover-grey.ml-10(icon="file" @click="create")
                    font-awesome-icon.hover-grey.ml-10(icon="folder-open" @click="load")
                h2.subtitle copy memo quickly
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'
    import electron from 'electron'

    @Component
    export default class Header extends Vue {

        private create() {
            const filepath = electron.remote.dialog.showSaveDialogSync({
                title: 'ファイル作成',
                message: '新規作成',
                filters: [
                    {
                        name: 'yaml',
                        extensions: ['yml']
                    }
                ]
            })
            if (filepath) {
                appStore.newFile(filepath)
                appStore.save()
            }
        }

        private load() {
            const filepaths = electron.remote.dialog.showOpenDialogSync({
                properties: ['openFile'],
                title: 'Select a text file',
                defaultPath: '.',
            })
            const filepath = filepaths![0]
            appStore.loadYamlFromFile(filepath)
        }
    }
</script>
