<template lang="pug">
    footer.footer
        .content.has-text-centered
            small &copy; 2019 bancha project
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator'

    @Component
    export default class Footer extends Vue {}
</script>
