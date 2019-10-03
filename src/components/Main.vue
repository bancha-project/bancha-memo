<template lang="pug">
    main.container.pt-20
        input#copy-area.hidden(type="text")
        .field(v-for="value, key in yaml")
            label.label.ml-10.mt-20 {{ key }}
            .control
                .is-inline-block
                    font-awesome-icon.hover-grey(icon="copy" @click="() => { copy(value) }" size="lg")
                .is-inline-block.ml-10
                    input.input(type="text" :value="value" readonly)
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'

    @Component
    export default class Main extends Vue {

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
