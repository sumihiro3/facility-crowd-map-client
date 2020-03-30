<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ facility.name }}
      </v-card-title>
      <v-card-text>
        <div class="mt-2 mb-2 text-center">
          <v-chip class="ma-0 font-weight-light overline" label :color="color1">
            1人程度
          </v-chip>
          <v-chip
            class="ma-0 font-weight-light overline"
            label
            :color="color2to5"
          >
            5人程度
          </v-chip>
          <v-chip
            class="ma-0 font-weight-light overline"
            label
            :color="color6to9"
          >
            10人程度
          </v-chip>
          <v-chip
            class="ma-0 font-weight-light overline"
            label
            :color="color10more"
          >
            10人以上
          </v-chip>
        </div>
      </v-card-text>
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
                <span style="color: rgba(0, 0, 0, 0.0);">｜</span>
              </v-card>
              <v-card v-else class="pa-0 ma-0" tile color="transparent">
                <span style="color: rgba(0, 0, 0, 0.0);">｜</span>
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

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Facility, BeaconArea, BeaconAreaData } from '~/types'
import BeaconAreas from '@/data/areas.json'

@Component
export default class FacilityHeatMap extends Vue {
  @Prop() facility!: Facility
  @Prop() beacondatalist!: BeaconAreaData[]
  beaconAreas: BeaconArea[] = BeaconAreas
  // Colors
  colorEmpty: string = 'rgba(0, 0, 0, 0.0)'
  color1: string = 'rgba(173, 216, 230, 0.5)'
  color2to5: string = 'rgb(30, 144, 255, 0.5)'
  color6to9: string = 'rgb(255, 165, 0, 0.5)'
  color10more: string = 'rgba(255, 0, 0, 0.5)'

  hasBeaconInCell(facilityId: number, cellNo: number) {
    console.log('hasBeaconInCell called', facilityId, cellNo)
    const beaconsInFacility = this.beaconAreas.filter(item => {
      return item.facilityId === facilityId
    })
    const targetBeaconForCell = beaconsInFacility.filter(item => {
      return item.cells.includes(cellNo)
    })
    return targetBeaconForCell.length > 0
  }

  getPersonInCell(facilityId: number, cellNo: number) {
    console.log('getPersonInCell called', facilityId, cellNo)
    const beaconsInFacility = this.beaconAreas.filter(item => {
      return item.facilityId === facilityId
    })
    const targetBeacon = beaconsInFacility.filter(item => {
      return item.cells.includes(cellNo) === true
    })[0]

    const targetAreaData = this.beacondatalist.filter(item => {
      return item.id === targetBeacon.beacon
    })[0]
    return targetAreaData.numberOfPerson
  }

  getCellColor(numberOfPerson: number) {
    console.log('getCellColor called', numberOfPerson)
    let result: string = this.colorEmpty
    if (numberOfPerson === 1) {
      result = this.color1
    } else if (numberOfPerson < 5) {
      result = this.color2to5
    } else if (numberOfPerson < 10) {
      result = this.color6to9
    } else {
      result = this.color10more
    }
    return result
  }

  closeComponent() {
    this.$emit('closeHeatMap')
  }
}
</script>

<style>
.v-card {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0);
}
</style>
