<template lang="pug">
    main.container.pt-20
        input#copy-area.hidden(type="text")
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
