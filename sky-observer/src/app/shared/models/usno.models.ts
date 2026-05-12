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

export interface OneDaySunData {
  rise?: string;
  set?: string;
}

export interface OneDayMoonData {
  rise?: string;
  set?: string;
  phase?: string;
}

export interface OneDayResponse {
  source?: string;
  input?: {
    date?: string;
    coords?: string;
    tz?: number | string;
    dst?: boolean | string;
  };
  sun?: OneDaySunData;
  moon?: OneDayMoonData;
}