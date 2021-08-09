export interface EventCount {
  id: string;
  date: Date;
  name?: string;
  value: number;
  comment?: string;
}

export interface EventSummary {
  sum: number;
  average: number;
  variance: number;
  min: number;
  max: number;
}
