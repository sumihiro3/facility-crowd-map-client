export interface FacilityBuilding {
  id: string
  name: string
  url: string
  facilities: Array<Facility>
}

export interface Facility {
  facilityId: number
  name: string
  mapUrl: string
  maxCells?: number
}

export interface BeaconArea {
  id: number
  facilityId: number
  name: string
  beacon: string
  cells: number[]
}

export interface BeaconAreaData {
  id: string
  numberOfPerson: number
}
