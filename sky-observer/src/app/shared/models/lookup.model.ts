export type LookupKind = 'phase' | 'day' | 'season';

export interface Lookup {
  _id?: string;
  kind: LookupKind;
  refLabel: string;
  dateOrYear: string;
  locationId?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}