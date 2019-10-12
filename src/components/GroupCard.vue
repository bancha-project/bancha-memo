<template lang="pug">
    .box
        template(v-if="isTitleEditMode")
            input.input(
                type="text"
                @blur="editTitleDone"
                @keydown.enter="blur"
                :value="this.itemGroup.name"
                v-focus
            )
        template(v-else)
            p.title.is-4(v-html="title" @click="isTitleEditMode = true")
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

        private isTitleEditMode: boolean = false

        get title() {
            if (appStore.condition === '') {
                return this.itemGroup.name
            }
            return DomUtils.hilightSelectedWord(this.itemGroup.name, appStore.condition)
        }

        private editTitleDone(e: any) {
            this.isTitleEditMode = false
            appStore.setItemGroupName({
                prev: this.itemGroup.name,
                after: e.target.value,
            })
            appStore.save()
        }

        private blur(el: any) {
            el.target.blur()
        }
    }
</script>
