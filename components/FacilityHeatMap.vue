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
                v-if="n % 3 == 0"
                class="pa-0 ma-0"
                tile
                color="rgba(255,0,0,0.5)"
              >
                <span style="color: rgba(0,0,0,0.0);">{{ n }}</span>
              </v-card>
              <v-card v-else class="pa-0 ma-0" tile color="transparent">
                <span style="color: rgba(0,0,0,0.0);">{{ n }}</span>
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
import { FacilityBuilding } from '~/types'

@Component
export default class FacilityHeatMap extends Vue {
  @Prop() building!: FacilityBuilding
  @Prop() facilityid!: number
  @Prop() facilityname!: string
  @Prop() facilitymapurl!: string
  @Prop() facilitymaxcells!: number

  closeComponent() {
    this.$emit('closeHeatMap')
  }
}
</script>
