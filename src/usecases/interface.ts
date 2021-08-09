import { EventCount, EventSummary } from "../model";

export interface IEventUsecase {
  fetchCount(): EventCount[];
  extractHasName(events: EventCount[]): EventCount[];
  extractHasComment(events: EventCount[]): EventCount[];
  extractAfterDate(events: EventCount[], baseDate: Date): EventCount[];
  calcStatisticalSummary(events: EventCount[]): EventSummary;
}
