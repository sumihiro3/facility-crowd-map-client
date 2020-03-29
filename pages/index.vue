<template>
  <div>
    <FacilityList @facilitySelected="facilitySelected" />
    <v-dialog v-model="isfacilitySelected" width="500" persistent>
      <FacilityHeatMap
        v-if="isfacilitySelected == true"
        :building="selectedBuilding"
        :facilityid="selectedFacilityId"
        :facilityname="selectedFacilityName"
        :facilitymapurl="selectedFacilityMapUrl"
        :facilitymaxcells="selectedfacilityMaxCells"
        @closeHeatMap="closeHeatMap"
      />
    </v-dialog>
  </div>
</template>

<style></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FacilityBuilding } from '../types'

@Component({
  components: {
    FacilityList: () => import('@/components/FacilityList.vue'),
    FacilityHeatMap: () => import('@/components/FacilityHeatMap.vue')
  }
})
export default class Index extends Vue {
  isfacilitySelected: boolean = false
  selectedBuilding: FacilityBuilding | null = null
  selectedFacilityId: string = ''
  selectedFacilityName: string = ''
  selectedFacilityMapUrl: string = ''
  selectedfacilityMaxCells: number = -1

  facilitySelected(building: FacilityBuilding, facilityId: string) {
    console.log(`Facility ${facilityId} on ${building.id} selected!!`)
    this.isfacilitySelected = true
    this.selectedBuilding = building
    this.selectedFacilityId = facilityId
    const facility = this.filterFacility(building, facilityId)[0]
    this.selectedFacilityName = facility.name
    this.selectedFacilityMapUrl = facility.mapUrl
    if (facility.maxCells) {
      this.selectedfacilityMaxCells = facility.maxCells
    }
  }

  filterFacility(building: FacilityBuilding, facilityId: string) {
    return building.facilities.filter(function(f) {
      return f.facilityId === facilityId
    })
  }

  closeHeatMap() {
    console.log('closeHeatMap')
    this.isfacilitySelected = false
  }
}
</script>
