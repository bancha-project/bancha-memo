<template lang="pug">
    .box
        p.title.is-4 {{ itemGroup.name }}
        .field(v-for="item in itemGroup.items")
            label.label.ml-10.mt-20 {{ item.key }}
            .control
                .is-inline-block
                    font-awesome-icon.hover-grey(icon="copy" @click="() => { copy(item.value) }" size="lg")
                .is-inline-block.ml-10(style="width:80%")
                    input.input(type="text" :value="item.value" readonly)
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { appStore } from '@/store'
    import ItemGroup from '@/domain/ItemGroup'

    @Component
    export default class GroupCard extends Vue {
        @Prop() private readonly itemGroup!: ItemGroup

        private copy(s: string) {
            appStore.copy(s)
        }
    }
</script>
