import { EventCount, EventSummary } from "../model";
import { IEventRepository } from "../repository/interface";
import { IEventUsecase } from "./interface";

export class EventUsecase implements IEventUsecase {
  private readonly repository: IEventRepository;

  constructor(repository: IEventRepository) {
    this.repository = repository;
  }

  fetchCount(): EventCount[] {
    return this.repository.fetchCount();
  }

  extractHasName(events: EventCount[]): EventCount[] {
    return events.filter((e) => e.name);
  }

  extractHasComment(events: EventCount[]): EventCount[] {
    return events.filter((e) => e.comment);
  }

  extractAfterDate(events: EventCount[], baseDate: Date): EventCount[] {
    return events.filter((e) => e.date > baseDate);
  }

  calcStatisticalSummary(events: EventCount[]): EventSummary {
    const values = events.map((e) => e.value);
    const sum = values.reduce((prev, curr) => curr + prev, 0);
    const average = sum / values.length;
    const variance =
      values.reduce((prev, curr) => (curr - average) ** 2 + prev, 0) /
      values.length;
    const max = Math.max(...values);
    const min = Math.min(...values);
    return {
      sum,
      average,
      variance,
      min,
      max,
    };
  }
}
