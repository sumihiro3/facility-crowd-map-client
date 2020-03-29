// export interface FacilityGroup {
//   id: string
//   name: string
//   url: string
// }

// export interface Facility {
//   id: string
//   groupId: string
//   name: string
// }

// export interface FacilityArea {
//   id: string
//   facilityId: string
//   name: string
//   x: number
//   y: number
// }

export interface FacilityBuilding {
  id: string
  name: string
  url: string
  facilities: Array<{
    facilityId: number
    name: string
    mapUrl: string
    maxCells?: number
  }>
}

export interface Facility {
  facilityId: number
  name: string
  mapUrl: string
  maxCells?: number
}
