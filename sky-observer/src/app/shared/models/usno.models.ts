export interface MoonPhaseItem {
  phase: string;
  year: number;
  month: number;
  day: number;
  time: string;
}

export interface MoonPhasesResponse {
  apiversion: string;
  phasedata: MoonPhaseItem[];
}

export interface SeasonItem {
  phenom: string;
  year: number;
  month: number;
  day: number;
  time: string;
}

export interface SeasonsResponse {
  data: SeasonItem[];
}