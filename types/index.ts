
export type Coordinate = {
  lat: number
  lng: number
}

export interface GeocalationState {
  position: Coordinate | null
  loading: boolean
  error: string | null
}

