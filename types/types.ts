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

export interface Facility {
  id: string
  name: string
  url: string
  floors: Array<{
    floorId: string
    name: string
  }>
}
