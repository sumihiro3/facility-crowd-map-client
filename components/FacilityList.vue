<template>
  <v-card class="mx-auto" width="100%">
    <v-list>
      <v-list-item>
        <v-list-item-title>
          混雑状況を見たい施設を選択してください
        </v-list-item-title>
      </v-list-item>

      <v-list-group
        v-for="facility in facilities"
        :key="facility.id"
        no-action
        sub-group
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>{{ facility.name }}</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="floor in facility.floors"
          :key="floor.floorId"
          @click="facilitySelected(facility.id, floor.floorId)"
        >
          <v-list-item-title v-text="floor.name"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<style></style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Facility } from '~/types'
import Facilities from '@/data/facilities.json'

@Component
export default class FacilityList extends Vue {
  facilities: Facility[] = Facilities

  hoge(val: number) {
    console.log('hoge', val)
  }

  facilitySelected(facility: string, floor: string) {
    console.log('Facility: ', facility)
    this.$emit('floorSelected', facility, floor)
  }
}
</script>
