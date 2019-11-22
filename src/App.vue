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
    import { appStore } from '@/store'

    @Component({
        components: {
            Header,
            Main,
            Footer,
        },
    })
    export default class App extends Vue {

        private created() {
            window.addEventListener('keydown', this.keydown)
        }

        private mounted() {
            appStore.init()
        }

        private destroyed() {
            window.removeEventListener('keydown', this.keydown)
        }

        private keydown(e: KeyboardEvent) {
            if (e.ctrlKey && e.key === 's') {
                (document.getElementById('filter') as HTMLInputElement).focus()
            }
        }
    }
</script>

<style lang="scss">
    html{
        scroll-behavior: smooth;
    }

    p {
        padding: 0;
        margin: 0;
    }

    .pt-20 {
        padding-top: 20px;
    }

    .ml-10 {
        margin-left: 10px;
    }

    .mt-20 {
        margin-top: 20px;
    }

    .mb-20 {
        margin-bottom: 20px;
    }

    .hover-grey:hover {
        color: grey;
    }

    .inline-block {
        display: inline-block;
    }

    .background-warning {
        background-color: yellow;
    }
</style>
