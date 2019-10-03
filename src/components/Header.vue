<template lang="pug">
    header.hero.is-dark
        .hero-body
            .container
                h1.title
                    span bancha memo
                    font-awesome-icon.hover-grey.ml-10(icon="folder-open" @click="load")
                    font-awesome-icon.hover-grey.ml-10(icon="file")
                h2.subtitle copy memo quickly
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'

    @Component
    export default class Header extends Vue {

        private load() {
            appStore.loadYamlFromFile()
        }
    }
</script>
