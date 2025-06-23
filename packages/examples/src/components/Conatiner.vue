<script setup lang="ts">
import { PlaContainer, PlaHeader, PlaFooter, PlaMain, PlaAside } from "@pla-element/components/Container";
</script>

<template>
<PlaContainer>
  <pla-aside>Aside</pla-aside>
  <pla-container>
    <PlaHeader>Header</PlaHeader>
    <PlaMain>Main</PlaMain>
    <PlaFooter>Footer</PlaFooter>
  </pla-container>
</PlaContainer>
</template>

<style scoped>

</style>