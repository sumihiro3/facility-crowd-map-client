<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ facility.name }}
      </v-card-title>
      <!-- <v-card-text>
      </v-card-text> -->
      <v-divider></v-divider>
      <v-img :src="facility.mapUrl" contain max-width="360px">
        <v-overlay absolute opacity="0.0">
          <v-layout wrap>
            <v-flex v-for="n in facility.maxCells" :key="n" xs3 sm3 md3 lg3 xl3>
              <v-card
                v-if="hasBeaconInCell(facility.facilityId, n) == true"
                class="pa-0 ma-0"
                tile
                :color="getCellColor(getPersonInCell(facility.facilityId, n))"
              >
                <span style="color: rgba(0,0,0,0.0);">｜</span>
              </v-card>
              <v-card v-else class="pa-0 ma-0" tile color="transparent">
                <span style="color: rgba(0,0,0,0.0);">｜</span>
              </v-card>
            </v-flex>
          </v-layout>
        </v-overlay>
      </v-img>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="closeComponent">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<style>
.v-card {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0);
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Facility, BeaconArea, BeaconAreaData } from '~/types'
import BeaconAreas from '@/data/areas.json'

@Component
export default class FacilityHeatMap extends Vue {
  @Prop() facility!: Facility
  @Prop() beacondatalist!: BeaconAreaData[]
  beaconAreas: BeaconArea[] = BeaconAreas

  hasBeaconInCell(facilityId: number, cellNo: number) {
    console.log('hasBeacon called', cellNo)
    const beaconsInFacility = this.beaconAreas.filter(item => {
      return item.facilityId === facilityId
    })
    const targetBeaconForCell = beaconsInFacility.filter(item => {
      return item.cells.includes(cellNo)
    })
    console.log('targetBeaconForCell', targetBeaconForCell)
    return targetBeaconForCell.length > 0
  }

  getPersonInCell(facilityId: number, cellNo: number) {
    console.log('getPersonInCell called', facilityId, cellNo)
    console.log('this.beaconAreas', this.beaconAreas)
    console.log('this.beacondatalist', this.beacondatalist)
    const beaconsInFacility = this.beaconAreas.filter(item => {
      return item.facilityId === facilityId
    })
    console.log('beaconsInFacility', beaconsInFacility)
    const targetBeacon = beaconsInFacility.filter(item => {
      return item.cells.includes(cellNo) === true
    })[0]
    console.log('targetBeacon', targetBeacon)

    const targetAreaData = this.beacondatalist.filter(item => {
      return item.id === targetBeacon.beacon
    })[0]
    console.log('beaconData', targetAreaData)
    console.log('numberOfPerson', targetAreaData.numberOfPerson)
    return targetAreaData.numberOfPerson
  }

  getCellColor(numberOfPerson: number) {
    console.log('getCellColor called', numberOfPerson)
    let result: string = 'rgba(255,0,0,0.5)'
    if (numberOfPerson === 0) {
      result = 'rgba(173,216,230,0.5)'
    } else if (numberOfPerson < 3) {
      result = 'rgb(30,144,255,0.5)'
    } else if (numberOfPerson < 10) {
      result = 'rgb(255,165,0,0.5)'
    }
    return result
  }

  closeComponent() {
    this.$emit('closeHeatMap')
  }
}
</script>
