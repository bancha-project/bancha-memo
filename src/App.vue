<template lang="pug">
    #app
        header
            h1 bancha-memo
        Main
        footer
            hr
            small bancha project
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
