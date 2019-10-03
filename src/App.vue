<template lang="pug">
    #app
        header
            section.hero.is-dark
                .hero-body
                    .container
                        h1.title
                            span bancha memo
                            font-awesome-icon.ml-10(icon="folder-open")
                            font-awesome-icon.ml-10(icon="file")
                        h2.subtitle copy memo quickly
        Main
        footer
            hr
            small &copy; 2019 bancha project
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

<style lang="scss">
    @import "../node_modules/bulma/bulma.sass";
    .ml-10 {
        margin-left: 10px;
    }
</style>
