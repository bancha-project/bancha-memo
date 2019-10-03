<template lang="pug">
    #app
        Header
        Main
        Footer
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import Header from '@/components/Header.vue'
    import Main from '@/components/Main.vue'
    import Footer from '@/components/Footer.vue'

    @Component({
        components: {
            Header,
            Main,
            Footer,
        },
    })
    export default class App extends Vue {}
</script>

<style lang="scss">
    $footer-background-color: white;
    @import "../node_modules/bulma/bulma.sass";

    .pt-20 {
        padding-top: 20px;
    }

    .ml-10 {
        margin-left: 10px;
    }

    .mt-20 {
        margin-top: 20px;
    }

    .hover-grey:hover {
        color: grey;
    }
</style>
