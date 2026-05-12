export interface Location {
  _id?: string;
  label: string;
  lat: number;
  lon: number;
  tz: number;
  dstDefault: boolean;
  createdAt?: string;
  updatedAt?: string;
}