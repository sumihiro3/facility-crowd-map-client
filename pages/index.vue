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
import { $axios } from '@/plugins/axios-accessor'

@Component({
  components: {
    FacilityList: () => import('@/components/FacilityList.vue'),
    FacilityHeatMap: () => import('@/components/FacilityHeatMap.vue')
  }
})
export default class Index extends Vue {
  isfacilitySelected: boolean = false
  selectedBuilding: FacilityBuilding | null = null
  selectedFacilityId: number = -1
  selectedFacilityName: string = ''
  selectedFacilityMapUrl: string = ''
  selectedfacilityMaxCells: number = -1
  apiResult: string = 'hoge'

  facilitySelected(building: FacilityBuilding, facilityId: number) {
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

  filterFacility(building: FacilityBuilding, facilityId: number) {
    return building.facilities.filter(function(f) {
      return f.facilityId === facilityId
    })
  }

  async mounted() {
    await this.getAreaData()
  }

  async closeHeatMap() {
    console.log('closeHeatMap')
    this.isfacilitySelected = false
    await this.getAreaData()
  }

  async getAreaData() {
    console.log('getAreaData called!!')
    const res = await $axios.get('https://jsonplaceholder.typicode.com/todos', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log('API Result', res.data)
    return {
      apiResult: res.data
    }
  }
}
</script>
