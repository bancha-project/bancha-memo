<template lang="pug">
    .box
        p.title.is-4 {{ itemGroup.name }}
        div(v-for="item in itemGroup.items")
            ItemField(:groupName="itemGroup.name" :item="item")
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator'
    import ItemField from '@/components/ItemField.vue'
    import ItemGroup from '@/domain/ItemGroup'

    @Component({
        components: {
            ItemField,
        },
    })
    export default class GroupCard extends Vue {

        @Prop() private readonly itemGroup!: ItemGroup
    }
</script>
