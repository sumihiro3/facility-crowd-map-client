<template>
  <div>
    <FacilityHeatMap />
  </div>
</template>

<style></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    FacilityHeatMap: () => import('@/components/FacilityHeatMap.vue')
  }
})
export default class Index extends Vue {}
</script>
