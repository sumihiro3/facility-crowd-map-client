<template>
  <div>
    <v-card class="mx-auto" width="100%" outlined>
      <v-list>
        <v-list-item>
          <v-list-item-title>
            混雑状況を見たい施設を選択してください
          </v-list-item-title>
        </v-list-item>

        <v-list-group
          v-for="building in facilityBuildings"
          :key="building.id"
          no-action
          sub-group
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>{{ building.name }}</v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="facility in building.facilities"
            :key="facility.facilityId"
            @click="facilitySelected(facility, building)"
          >
            <v-list-item-title v-text="facility.name"></v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-card>
    <!-- Heat map -->
    <v-dialog v-model="isBeaconDataListLoaded" width="500" persistent>
      <FacilityHeatMap
        v-if="isBeaconDataListLoaded"
        :facility="selectedFacility"
        :beacondatalist="beaconAreaDataList"
        @closeHeatMap="closeHeatMap"
      />
    </v-dialog>
  </div>
</template>

<style></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FacilityBuilding, Facility, BeaconAreaData } from '../types'
import { $axios } from '@/plugins/axios-accessor'
import FacilityBuildings from '@/data/facility_buildings.json'

@Component({
  components: {
    FacilityHeatMap: () => import('@/components/FacilityHeatMap.vue')
  }
})
export default class Index extends Vue {
  facilityBuildings: FacilityBuilding[] = FacilityBuildings
  isBeaconDataListLoaded: boolean = false
  selectedBuilding: FacilityBuilding | null = null
  selectedFacility: Facility | null = null
  beaconAreaDataList: BeaconAreaData[] | null = null

  async facilitySelected(facility: Facility, building: FacilityBuilding) {
    console.log('Facility: ', facility)
    console.log('Building: ', building)
    this.isBeaconDataListLoaded = false
    this.selectedBuilding = building
    this.selectedFacility = facility
    this.beaconAreaDataList = await this.getFacilityBeaconData(
      facility.facilityId
    )
    this.isBeaconDataListLoaded = true
  }

  async getFacilityBeaconData(facilityId: number) {
    console.log('getFacilityBeaconData called!!', facilityId)
    const res = await $axios.get(
      // TODO This is fake server. Need to change.
      `http://my-json-server.typicode.com/sumihiro3/facility-crowd-map-client/facilities/${facilityId}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    console.log('API Result', res.data)
    return res.data.values
  }

  closeHeatMap() {
    console.log('closeHeatMap')
    this.isBeaconDataListLoaded = false
  }
}
</script>
