<template lang="pug">
    .box
        p.title.is-4(v-html="title")
        div(v-for="item in itemGroup.items")
            ItemField(:groupName="itemGroup.name" :item="item")
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ItemField from '@/components/ItemField.vue'
    import ItemGroup from '@/domain/ItemGroup'
    import { appStore } from '@/store'
    import DomUtils from '@/utils/DomUtils'

    @Component({
        components: {
            ItemField,
        },
    })
    export default class GroupCard extends Vue {

        @Prop() private readonly itemGroup!: ItemGroup

        get title() {
            if (appStore.condition === '') {
                return this.itemGroup.name
            }
            return DomUtils.hilightSelectedWord(this.itemGroup.name, appStore.condition)
        }
    }
</script>
