<template>
  <div>
    <FacilityList @floorSelected="floorSelected" />
  </div>
</template>

<style></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    FacilityList: () => import('@/components/FacilityList.vue'),
    FacilityHeatMap: () => import('@/components/FacilityHeatMap.vue')
  }
})
export default class Index extends Vue {
  floorSelected(facility: string, floor: string) {
    console.log(`Floor ${floor} on ${facility} selected!!`)
  }
}
</script>
