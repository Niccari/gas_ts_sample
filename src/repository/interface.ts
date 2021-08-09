import { EventCount } from "../model";

export interface IEventRepository {
  fetchCount(): EventCount[];
}
