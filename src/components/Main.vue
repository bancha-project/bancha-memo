<template lang="pug">
    main.container.pt-20
        input#copy-area.hidden(type="text")
        .field
            .control.has-icons-left
                input.input.is-info(type="text" placeholder="しぼりこみ")
                span.icon.is-small.is-left
                    font-awesome-icon.hover-grey(icon="filter" size="lg")
        div.mb-20(v-for="itemGroup in itemGroups")
            GroupCard(:itemGroup="itemGroup")
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'
    import { appStore } from '@/store'
    import GroupCard from '@/components/GroupCard.vue'

    @Component({
        components: {
            GroupCard,
        },
    })
    export default class Main extends Vue {

        get itemGroups() {
            return appStore.itemGroups
        }
    }
</script>

<style>
    .hidden {
        position: absolute;
        top: -200px;
    }
</style>
