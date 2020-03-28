<template>
  <div>
    <v-img
      src="https://www.city.osaka.lg.jp/somu/cmsfiles/contents/0000004/4219/04_1F.jpg"
      contain
    >
      <v-overlay absolute opacity="0.0">
        <v-layout wrap>
          <v-flex v-for="n in 36" :key="n" xs3 sm3 md3>
            <v-card
              v-if="n % 3 == 0"
              class="pa-0 ma-0"
              tile
              color="rgba(255,0,0,0.5)"
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
  </div>
</template>

<style>
.v-card {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px 0px rgba(0, 0, 0, 0),
    0px 0px 0px 0px rgba(0, 0, 0, 0);
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class FacilityHeatMap extends Vue {}
</script>
