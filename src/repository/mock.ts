import { dateParser } from "../libs/date";
import { EventCount } from "../model";
import { IEventRepository } from "./interface";

export class EventMockRepository implements IEventRepository {
  fetchCount(): EventCount[] {
    return [
      {
        id: "abcdefghijklmn",
        name: "foobaz",
        date: dateParser().toDate("2020-01-23T10:00:00Z"),
        comment: "hoge",
        value: 1,
      },
      {
        id: "IOJRGIOJGWGojg",
        date: dateParser().toDate("2019-01-24T10:00:00Z"),
        value: 2,
      },
      {
        id: "Skopj42jgiosjd",
        date: dateParser().toDate("2018-01-24T11:00:00Z"),
        value: -3,
      },
    ];
  }
}
