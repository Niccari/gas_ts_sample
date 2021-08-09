import { IDateParser } from "./interface";

class DateParser implements IDateParser {
  toDate(dateString: string): Date {
    return new Date(dateString);
  }
}

// ÑG(Can't import on GAS console, will be converted to exports.dateParse which not importable.)
// export const dateParser = new DateParser();

const _dateParser = new DateParser();
export function dateParser(): DateParser {
  return _dateParser;
}
