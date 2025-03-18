export interface MonthlyPower {
  obsmonth: string;
  fuel: number | null;
  general: number | null;
  heater: number | null;
  nutsys: number | null;
  storage: number | null;
}
export interface DailyPower {
  obsday: string;
  data_value: number | null;
}
