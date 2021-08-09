import { dateParser } from "../libs/date";
import { EventCount } from "../model";
import { IEventRepository } from "./interface";

export class EventSpreadSheetRepository implements IEventRepository {
  fetchCount(): EventCount[] {
    const sheet = SpreadsheetApp.getActiveSheet();
    const values = sheet.getDataRange().getValues();
    const header: string[] = values[0];
    const body: Record<string, string | undefined>[] = values
      .slice(1)
      .map((columns) => {
        const item: Record<string, string | undefined> = {};
        columns.forEach((value, index) => {
          const key = header[index];
          item[key] = value;
        });
        return item;
      });
    return body.map((b) => {
      return {
        id: b["id"] || "",
        name: b["name"],
        comment: b["comment"],
        date: dateParser().toDate(b["date"] || ""),
        value: parseInt(b["value"] || "0"),
      };
    });
  }
}
