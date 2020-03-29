<template>
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
          @click="facilitySelected(building, facility.facilityId)"
        >
          <v-list-item-title v-text="facility.name"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<style></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FacilityBuilding } from '~/types'
import FacilityBuildings from '@/data/facility_buildings.json'

@Component
export default class FacilityList extends Vue {
  facilityBuildings: FacilityBuilding[] = FacilityBuildings

  hoge(val: number) {
    console.log('hoge', val)
  }

  facilitySelected(building: FacilityBuilding, facility: string) {
    console.log('Facility: ', facility)
    this.$emit('facilitySelected', building, facility)
  }
}
</script>
