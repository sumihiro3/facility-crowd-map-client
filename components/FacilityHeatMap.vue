<template>
  <div>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        {{ facilityname }}
      </v-card-title>
      <v-card-text>
        {{ building.name }}
      </v-card-text>
      <v-divider></v-divider>
      <v-img :src="facilitymapurl" contain max-width="360px">
        <v-overlay absolute opacity="0.0">
          <v-layout wrap>
            <v-flex v-for="n in facilitymaxcells" :key="n" xs3 sm3 md3 lg3 xl3>
              <v-card
                v-if="hasBeaconInCell(facilityid, n) == true"
                class="pa-0 ma-0"
                tile
                :color="getCellColor(getPersonInCell(facilityid, n))"
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
import { FacilityBuilding, BeaconArea } from '~/types'
import BeaconAreas from '@/data/areas.json'

@Component
export default class FacilityHeatMap extends Vue {
  @Prop() building!: FacilityBuilding
  @Prop() facilityid!: number
  @Prop() facilityname!: string
  @Prop() facilitymapurl!: string
  @Prop() facilitymaxcells!: number
  @Prop() beaconlist!: any[]
  beaconAreas: BeaconArea[] = BeaconAreas

  hasBeaconInCell(facilityId: number, cellNo: number) {
    console.log('hasBeacon called', cellNo)
    const beacons = this.beaconAreas.filter(item => {
      return (item.facilityId = facilityId)
    })
    const cells = beacons.filter(item => {
      if (item.cells.includes(cellNo) === true) {
        return cellNo
      }
    })
    console.log(cells)
    return cells.length > 0
  }

  getPersonInCell(facilityId: number, cellNo: number) {
    console.log('getPersonInCell called', cellNo)
    const beacons = this.beaconAreas.filter(item => {
      return (item.facilityId = facilityId)
    })
    const cells = beacons.filter(item => {
      if (item.cells.includes(cellNo) === true) {
        this.beaconlist.filter(a => {
          if (a.area_id === item.beacon) {
            return a.number_of_person
          }
        })
      }
    })
    console.log(cells)
    return cells[0]
  }

  getBeaconCells(beaconId: string) {
    console.log('getBeaconCells called')
    const beacons = this.beaconAreas.filter(item => {
      return (item.beacon = beaconId)
    })
    console.log(beacons)
    return beacons[0].cells
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
